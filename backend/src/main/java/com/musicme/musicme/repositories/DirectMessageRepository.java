package com.musicme.musicme.repositories;

import com.musicme.musicme.entities.DirectMessage;
import com.musicme.musicme.entities.DirectMessageIdentity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface DirectMessageRepository extends JpaRepository<DirectMessage, DirectMessageIdentity> {

    List<DirectMessage> findByDirectMessageIdentity(DirectMessageIdentity directMessageIdentity);

    DirectMessage deleteByDirectMessageIdentity(DirectMessageIdentity directMessageIdentity);
    
}
