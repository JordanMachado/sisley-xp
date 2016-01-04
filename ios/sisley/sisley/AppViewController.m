//
//  ViewController.m
//  sisley
//
//  Created by MACHADO Jordan on 04/11/2015.
//  Copyright © 2015 MACHADO Jordan. All rights reserved.
//

#import "AppViewController.h"
#import <IFTTTJazzHands.h>

@interface AppViewController ()

@property (nonatomic, strong) IFTTTAnimator *animator;

@property (nonatomic, strong) UIImageView *jazz;
@end

@implementation AppViewController





- (void)viewDidLoad {
    [super viewDidLoad];
    self.scrollView.delegate  = self;
    self.scrollView.contentSize = CGSizeMake(self.view.bounds.size.width*3, self.scrollView.bounds.size.height);
    self.scrollView.showsHorizontalScrollIndicator = NO;
    
    self.animator = [IFTTTAnimator new];


    [self configureViews];
    [self configureAnimations];
    
    
  
    
    // Do any additional setup after loading the view, typically from a nib.
}


- (void)configureViews
{
    
    self.jazz = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"menu"]];
    self.jazz.frame = CGRectMake((self.view.bounds.size.width / 2) - ((self.jazz.bounds.size.width ) / 2), self.scrollView.bounds.size.height / 2 - (self.jazz.bounds.size.height ) / 2, self.jazz.bounds.size.width, self.jazz.bounds.size.height );
    [self.scrollView addSubview:self.jazz];
    
}
-(void)configureAnimations {
    
    // grow the circle into the background between pages 0 and 1
    IFTTTScaleAnimation *circleScaleAnimation = [IFTTTScaleAnimation animationWithView:self.jazz];
    [circleScaleAnimation addKeyframeForTime:0 scale:0.5 withEasingFunction:IFTTTEasingFunctionEaseInQuad];
    [circleScaleAnimation addKeyframeForTime:6 scale:6];
    
    [self.animator addAnimation: circleScaleAnimation];
    
}

- (IBAction)onTouchUpInsideXpBtn:(id)sender {
    NSLog(@"xp");
}
- (IBAction)onTouchUpInsideJardinBtn:(id)sender {
        NSLog(@"jardin");
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
- (void)scrollViewDidScroll:(UIScrollView *)scrollView
{
    [self.animator animate:scrollView.contentOffset.x];
    NSLog(@"scrool");
}

@end
