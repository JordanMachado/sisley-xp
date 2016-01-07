//
//  VideoViewController.m
//  sisley
//
//  Created by MACHADO Jordan on 07/01/2016.
//  Copyright © 2016 MACHADO Jordan. All rights reserved.
//

#import "VideoViewController.h"
#import <MediaPlayer/MediaPlayer.h>

@interface VideoViewController ()

@end
MPMoviePlayerController *moviePlayer;
@implementation VideoViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    NSLog(@"video");
    NSBundle *bundle = [NSBundle mainBundle];
    NSString *moviePath = [bundle pathForResource:@"test" ofType:@"mov"];
    NSURL *movieURL = [NSURL fileURLWithPath:moviePath] ;
    
    moviePlayer = [[MPMoviePlayerController alloc] initWithContentURL:movieURL];
    NSLog(@"%@",moviePlayer);
        NSLog(@"%@",movieURL);
    
//    moviePlayer.controlStyle = MPMovieControlStyleFullscreen;
   // moviePlayer.view.transform = CGAffineTransformConcat(moviePlayer.view.transform, CGAffineTransformMakeRotation(M_PI_2));
    UIWindow *backgroundWindow = [[UIApplication sharedApplication] keyWindow];
    [moviePlayer.view setFrame:self.view.frame];
    [self.view addSubview:moviePlayer.view];
    [moviePlayer play];
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
