package com.musicme.musicme.controller;

import com.musicme.musicme.entities.User;
import com.musicme.musicme.entities.DirectMessage;
import com.musicme.musicme.entities.DirectMessageIdentity;
import com.musicme.musicme.services.UserServiceImpl;
import com.musicme.musicme.services.DirectMessageServiceImpl;
import com.musicme.musicme.services.VideoServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.ArrayList;
import java.util.Set;
import java.util.Stack;
import java.util.Date;
import java.util.HashSet;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

@RestController
public class DirectMessageController {

    @Autowired
    UserServiceImpl userService;

    @Autowired
    VideoServiceImpl videoService;

    @Autowired
    DirectMessageServiceImpl directMessageService;

    @GetMapping("/messages")
    public List<User> getAllChats(Long id) {        
        List<DirectMessage> dms = this.directMessageService.getByUsersMatching(id, null);
        this.directMessageService.getByUsersMatching(null, id).forEach(dms::add);

        Set<User> uniqueUsers = new HashSet<User>();
        Stack<User> chatWithUser = new Stack<>();
        uniqueUsers.add(this.userService.getById(id));

        for (int i = 0; i < dms.size(); ++i) {
            if ((!uniqueUsers.contains(dms.get(i).getUser1()) || (!uniqueUsers.contains(dms.get(i).getUser2())))) {
                User toAdd = dms.get(i).getUser1().getId() == id ? dms.get(i).getUser2() : dms.get(i).getUser1();
                uniqueUsers.add(toAdd);
                chatWithUser.push(toAdd);
            }
        }

        ArrayList<User> listUsers = new ArrayList<User>();
        int size = chatWithUser.size();
        for (int i = 0; i < size; ++i) {
            listUsers.add(i, chatWithUser.pop());
        }

        return listUsers;
    }

    @GetMapping("/messages/{yourId}")
    public List<DirectMessage> getMessages(Long myId, @PathVariable Long yourId) {
        List<DirectMessage> sent = this.directMessageService.getByUsersMatching(myId, yourId);
        List<DirectMessage> received = this.directMessageService.getByUsersMatching(yourId, myId);

        List<DirectMessage> sentAndReceived = new ArrayList<>();
        DateFormat format = new SimpleDateFormat("yyyy_MM_dd_HH_mm_ss");

        int j = 0, k = 0;
        try {
            while (j < sent.size() && k < received.size()) {
                Date dateSent = format.parse(sent.get(j).getDirectMessageIdentity().getTimestamp());
                Date dateReceived = format.parse(received.get(k).getDirectMessageIdentity().getTimestamp());
                if (dateSent.compareTo(dateReceived) < 0) {
                    sentAndReceived.add(sent.get(j));
                    j++;
                } else {
                    sentAndReceived.add(received.get(k));
                    k++;
                }
            }
        } catch (java.text.ParseException e) {} // do nothing bc timestamp will always exist

        while (j < sent.size()) {
            sentAndReceived.add(sent.get(j));
            j++;
        } 
        while (k < received.size()) {
            sentAndReceived.add(received.get(k));
            k++;
        }

        return sentAndReceived;
    }    

    @PostMapping("/user/dm/send")
    public DirectMessage saveOrUpdate(Long id1, Long id2, String content) {
        User user1 = this.userService.getById(id1);
        User user2 = this.userService.getById(id2);
        DirectMessageIdentity directMessageIdentity = new DirectMessageIdentity(id1, id2, new SimpleDateFormat("yyyy_MM_dd_HH_mm_ss").format(new Date()));

        DirectMessage directMessage = new DirectMessage(directMessageIdentity, user1, user2, content);
        return this.directMessageService.save(directMessage);
    }

    @RequestMapping("/user/dm/remove")
    public DirectMessage delete(String timestamp, Long id1, Long id2) {
        DirectMessageIdentity directMessageIdentity = new DirectMessageIdentity(id1, id2, timestamp);
        return this.directMessageService.delete(directMessageIdentity);
    }

}
