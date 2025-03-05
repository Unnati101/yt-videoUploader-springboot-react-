package com.example.ai_backend.controller;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.ai_backend.service.YoutubeVideoUpload;

@RestController
@RequestMapping("/api/v1/uploadVideo")
@CrossOrigin("*")
public class youtubeVideoServiceController {

    private final YoutubeVideoUpload youtubeVideoUpload;

    //making a constructtor
    
    public youtubeVideoServiceController(YoutubeVideoUpload youtubeVideoUpload){
        this.youtubeVideoUpload = youtubeVideoUpload;
    }

 @PostMapping
    public ResponseEntity<String> uploadVideo(
        @RequestParam("title") String title,
        @RequestParam("desc") String desc,
        @RequestParam("visibility") String visibility,
        @RequestParam("videoFile") MultipartFile videoFile,
        @RequestHeader("Authorization") String accessToken
    ) throws IOException {
        
      
        
        // Call upload service
        String response = youtubeVideoUpload.uploadVideo(title, desc, visibility, videoFile, accessToken.replace("Bearer", ""));

        return ResponseEntity.ok(response);
    }
}