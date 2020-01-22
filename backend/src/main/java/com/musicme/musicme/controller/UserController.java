package com.musicme.musicme.controller;

import com.musicme.musicme.entities.UploadFileResponse;
import com.musicme.musicme.entities.User;
import com.musicme.musicme.entities.Video;
import com.musicme.musicme.security.CurrentUser;
import com.musicme.musicme.security.UserPrincipal;
import com.musicme.musicme.services.FileStorageService;
import com.musicme.musicme.services.UserServiceImpl;
import com.musicme.musicme.services.VideoServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    UserServiceImpl userService;

    @Autowired
    VideoServiceImpl videoService;

    @RequestMapping("/")
    public String getUsers() {
        return "works";
    }

    @RequestMapping("/user/saveupdate")
    public User saveOrUpdate(   User user) {
        return this.userService.saveOrUpdate(user);
    }

    @RequestMapping("/user/delete")
    public User delete(Long id) {
       User user = this.userService.getById(id);
       this.userService.delete(id);
       return user;
    }

    @RequestMapping("/user/listall")
    public List<User> getAll() {
        return this.userService.listAll();
    }

    @GetMapping("/user/me")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return this.userService.getCurrentUser(userPrincipal);
    }

    @PostMapping("/user/updatePhoto")
    public UploadFileResponse uploadeProfilePic(@RequestParam("file") MultipartFile file, Long id) {
        String[] parsedFileName = file.getOriginalFilename().split("\\.");
        String profilePic = "profile_pic." + parsedFileName[parsedFileName.length - 1];

        String fileName = fileStorageService.storeFile(file, id, profilePic);
        User user = this.userService.getById(id);
        user.setImageUrl(fileName);
        this.userService.saveOrUpdate(user);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloadFile/")
                .path(fileName)
                .toUriString();

        return new UploadFileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize());
    }

}
