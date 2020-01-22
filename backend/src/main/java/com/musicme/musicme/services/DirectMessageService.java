package com.musicme.musicme.services;

import com.musicme.musicme.entities.DirectMessage;
import com.musicme.musicme.entities.DirectMessageIdentity;

import java.util.List;

public interface DirectMessageService {
    
    List<DirectMessage> getByUsersMatching(Long user1Id, Long user2Id);

    DirectMessage save(DirectMessage directMessage);

    DirectMessage delete(DirectMessageIdentity directMessageIdentity);

}
