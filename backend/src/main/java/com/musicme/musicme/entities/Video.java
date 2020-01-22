package com.musicme.musicme.entities;

import javax.persistence.*;

@Entity
@Table(name = "videos")
public class Video {

    @EmbeddedId
    private VideoIdentity videoIdentity;
    
    @MapsId("userId")
    @ManyToOne
    public User user;

    @Column(name="location")
    private String location;

    @Column(name="caption")
    private String caption;

    @Column(name="path_to_video")
    private String pathToVideo;

    public Video(VideoIdentity videoIdentity, User user, String location, String caption, String pathToVideo) {
        this.videoIdentity = videoIdentity;
        this.user = user;
        this.location = location;
        this.caption = caption;
        this.pathToVideo = pathToVideo;
    }

    public Video() {
    }

    public VideoIdentity getVideoIdentity() {
        return this.videoIdentity;
    }

    public void setVideoIdentity(VideoIdentity videoIdentity) {
        this.videoIdentity = videoIdentity;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public String getPathToVideo() {
        return this.pathToVideo;
    }

    public void setPathToVideo(String pathToVideo) {
        this.pathToVideo = pathToVideo;
    }

}
