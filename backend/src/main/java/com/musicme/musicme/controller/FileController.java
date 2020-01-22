package com.musicme.musicme.controller;

import com.musicme.musicme.entities.*;
import com.musicme.musicme.entities.UploadFileResponse;
import com.musicme.musicme.repositories.UserRepository;
import com.musicme.musicme.repositories.VideoRepository;
import com.musicme.musicme.services.FileStorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

import java.util.Date;
import java.text.SimpleDateFormat;

@RestController
public class FileController {

    private static final Logger logger = LoggerFactory.getLogger(FileController.class);

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private VideoController videoController;

    @Autowired
    private UserRepository userRepository;

    // On the assumption that to upload a video, you must be a user in our database
    @PostMapping("/uploadFile/{id}")
    public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file, @PathVariable Long id, String caption) {
        // Changing file name to match {id}_{year}_{month}_{day}_{hour}_{minute}_{second} format
        String timestamp = new SimpleDateFormat("yyyy_MM_dd_HH_mm_ss").format(new Date());
        String oldFileName = file.getOriginalFilename();
        String[] parsedFileName = oldFileName.split("\\.");
        String newFileName = timestamp + "." + parsedFileName[parsedFileName.length - 1];

        String fileName = fileStorageService.storeFile(file, id, newFileName);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/downloads/")
                .path(fileName)
                .toUriString();

        User user = userRepository.findById(id).get();
        VideoIdentity videoIdentity = new VideoIdentity(id, timestamp);
        Video video = new Video(videoIdentity, user, "", caption, fileName);
        videoController.saveOrUpdate(video);
        return new UploadFileResponse(fileName, fileDownloadUri,
                file.getContentType(), file.getSize());
    }

    @GetMapping("/downloadFile/{id}/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, @PathVariable Long id, HttpServletRequest request) {
        // Load file as Resource
        Resource resource = fileStorageService.loadFileAsResource(String.format("%s/%s", id, fileName));

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            logger.info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}