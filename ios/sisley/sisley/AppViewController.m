//
//  ViewController.m
//  sisley
//
//  Created by MACHADO Jordan on 04/11/2015.
//  Copyright © 2015 MACHADO Jordan. All rights reserved.
//

// https://github.com/IFTTT/JazzHands
#import "AppViewController.h"
#import <MediaPlayer/MediaPlayer.h>
#import "JardinViewController.h"



@interface AppViewController ()



@end

@implementation AppViewController



- (void)viewDidLoad {
    [super viewDidLoad];
    [self start_Web_View ];
    [self configureVideo];
    
    // Do any additional setup after loading the view, typically from a nib.
}





#pragma mark webview delegate

- (void) start_Web_View {
    self.webview = [[UIWebView alloc] initWithFrame:CGRectMake(0,0,self.view.bounds.size.width,self.view.bounds.size.height)];
    self.webview.delegate = self;
    NSURL *url = [NSURL URLWithString:@"http://stackoverflow.com/questions/7418815/background-loading-a-url-in-a-uiwebview"];
    [self.webview loadRequest:[NSURLRequest requestWithURL:url]];
    
    // go do something else to amuse the user while the web site loads...
}


- (void) webViewDidFinishLoad:(UIWebView *)webView {
    NSLog(@"finished loaded");
    [self.moviePlayer play];

}


- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType {
    NSString *URLString = [[request URL] absoluteString];
        [self performSegueWithIdentifier:@"jardin" sender:self];
    if ([URLString isEqualToString:@"http://www.example.com/step3.htm"]) {
        // The user reached step 3!
    }
    return YES;
}

-(void)configureVideo{
    NSBundle *bundle = [NSBundle mainBundle];
    NSString *moviePath = [bundle pathForResource:@"movie_1" ofType:@"mp4"];
    NSLog(@"%@",moviePath);
    NSURL *movieURL = [NSURL fileURLWithPath:moviePath] ;
    
    self.moviePlayer = [[MPMoviePlayerController alloc] initWithContentURL:movieURL];
    
    
    self.moviePlayer.controlStyle = MPMovieControlStyleNone;
    // self.moviePlayer.view.transform = CGAffineTransformConcat(self.moviePlayer.view.transform, CGAffineTransformMakeRotation(M_PI_2));
    UIWindow *backgroundWindow = [[UIApplication sharedApplication] keyWindow];
    [self.moviePlayer.view setFrame:backgroundWindow.frame];
    //    [self.view addSubview:self.moviePlayer.view];
    [self.view insertSubview:self.moviePlayer.view atIndex:0];
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(MPMoviePlayerPlaybackStateDidChange:)
                                                 name:MPMoviePlayerPlaybackStateDidChangeNotification
                                               object:nil];

}


-(void)hidePoster:(id)sender  {
    self.posterImg.alpha = 0.0;
}

- (void)MPMoviePlayerPlaybackStateDidChange:(NSNotification *)notification
{

    if (self.moviePlayer.playbackState == 1)
    {
       
        [NSTimer scheduledTimerWithTimeInterval:.06 target:self selector:@selector(hidePoster:) userInfo:nil repeats:NO];
        
    }
    if (self.moviePlayer.playbackState == 2)
    {
        [self.view insertSubview:self.webview atIndex:0];
        [UIView animateWithDuration:.4f delay:0 options:UIViewAnimationOptionCurveEaseOut animations:^{
            self.moviePlayer.view.alpha = 0.;
        } completion:NULL];

    }
    
}



- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}





@end
