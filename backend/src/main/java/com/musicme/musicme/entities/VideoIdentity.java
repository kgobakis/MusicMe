package com.musicme.musicme.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Embeddable
public class VideoIdentity implements Serializable{

    private static final long serialVersionUID = 1L;

    public Long userId;

    public String timestamp;

    public VideoIdentity(Long userId, String timestamp) {
        this.userId = userId;
        this.timestamp = timestamp;
    }

    public VideoIdentity() {
    }

    public Long getUser() {
        return this.userId;
    }

    public void setUser(Long userId) {
        this.userId = userId;
    }

    public String getTimestamp() {
        return this.timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        VideoIdentity that = (VideoIdentity) o;

        if (!userId.equals(that.userId)) return false;

        return timestamp.equals(that.timestamp);
    }

    @Override
    public int hashCode() {
        int result = userId.hashCode();
        result = 31 * result + timestamp.hashCode();

        return result;
    }

}
