package com.musicme.musicme.entities;

import javax.persistence.*;

@Entity
public class DirectMessage {

    @EmbeddedId
    private DirectMessageIdentity directMessageIdentity;

    @MapsId("userId1")
    @ManyToOne
    private User user1;

    @MapsId("userId2")
    @ManyToOne
    private User user2;

    // something to note here is that neither content nor video is set to not-null and that's because either can be null
    // but BOTH can't be null... we need to somehow enforce this idea
    @Column(name="content")
    private String content;

    // // TODO join on composite videoId rather than path_to_video
    // @OneToOne
    // @JoinColumn(name="video", referencedColumnName="path_to_video", nullable=true)
    // private Video video;

    public DirectMessage(DirectMessageIdentity directMessageIdentity, User user1, User user2, String content) {
        this.directMessageIdentity = directMessageIdentity;
        this.user1 = user1;
        this.user2 = user2;
        this.content = content;
    }

    public DirectMessage() {
    }

    public DirectMessageIdentity getDirectMessageIdentity() {
        return this.directMessageIdentity;
    }

    public void setDirectMessageIdentity(DirectMessageIdentity directMessageIdentity) {
        this.directMessageIdentity = directMessageIdentity;
    }

    public User getUser1() {
        return this.user1;
    }

    public void setUser1(User user1) {
        this.user1 = user1;
    }

    public User getUser2() {
        return this.user2;
    }

    public void setUser2(User user2) {
        this.user2 = user2;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

}
