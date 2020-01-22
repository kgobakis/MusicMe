package com.musicme.musicme.entities;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Embeddable
public class DirectMessageIdentity implements Serializable {

    private Long userId1;

    private Long userId2;

    private String timestamp;

    public DirectMessageIdentity(Long userId1, Long userId2, String timestamp) {
        this.userId1 = userId1;
        this.userId2 = userId2;
        this.timestamp = timestamp;
    }

    public DirectMessageIdentity() {
    }

    public Long getUser1() {
        return this.userId1;
    }

    public void setUser1(Long userId1) {
        this.userId1 = userId1;
    }

    public Long getUser2() {
        return this.userId2;
    }

    public void setUser2(Long userId2) {
        this.userId2 = userId2;
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

        DirectMessageIdentity that = (DirectMessageIdentity) o;

        if (!userId1.equals(that.userId1) && !userId2.equals(that.userId2)) return false;

        return timestamp.equals(that.timestamp);
    }

    @Override
    public int hashCode() {
        int result = userId1.hashCode() + userId2.hashCode();
        result = 31 * result + timestamp.hashCode();

        return result;
    }

}
