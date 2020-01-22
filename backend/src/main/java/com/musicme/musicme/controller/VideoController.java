package com.musicme.musicme.controller;

import com.musicme.musicme.entities.User;
import com.musicme.musicme.entities.Video;
import com.musicme.musicme.entities.VideoIdentity;
import com.musicme.musicme.services.UserServiceImpl;
import com.musicme.musicme.services.VideoServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class VideoController {

    @Autowired
    VideoServiceImpl videoService;

    @Autowired
    UserServiceImpl userService;

    @GetMapping("/feed")
    public List<Video> getVideos() {
        return this.videoService.listAll();
    }

    @GetMapping("/user/video/saveorupdate")
    public Video saveOrUpdate(Video video) {
        return this.videoService.saveOrUpdate(video);
    }

    @GetMapping("/user/video/remove") 
    public Video delete(String timestamp, Long userId) {
        // User user = this.userService.getById(userId);
        VideoIdentity videoIdentity = new VideoIdentity(userId, timestamp);
        return this.videoService.delete(videoIdentity);
    }

    @GetMapping("/videos/{id}")
    public List<Video> getUserVideos(@PathVariable Long id) {
        return this.videoService.getByUser(id);
    }

}
