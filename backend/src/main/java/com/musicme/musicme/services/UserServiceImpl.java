package com.musicme.musicme.services;

import com.musicme.musicme.entities.User;
import com.musicme.musicme.exceptions.ResourceNotFoundException;
import com.musicme.musicme.repositories.UserRepository;
import com.musicme.musicme.security.CurrentUser;
import com.musicme.musicme.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Qualifier("userRepository")
    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public List<User> listAll() {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add); //fun with Java 8
        return users;
    }

    @Override
    public User getById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User saveOrUpdate(User user) {
        userRepository.save(user);
        return user;
    }

    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);

    }
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }

}
