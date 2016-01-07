//
//  ViewController.h
//  sisley
//
//  Created by MACHADO Jordan on 04/11/2015.
//  Copyright © 2015 MACHADO Jordan. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <MediaPlayer/MediaPlayer.h>

@interface AppViewController : UIViewController <UIWebViewDelegate>

@property (strong, nonatomic) MPMoviePlayerController *moviePlayer;
@property (strong, nonatomic) IBOutlet UIWebView *webview;
@property (weak, nonatomic) IBOutlet UIImageView *posterImg;

@property(nonatomic) BOOL menuIsOpen;
@end

