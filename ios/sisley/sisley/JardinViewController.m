//
//  JardinViewController.m
//  sisley
//
//  Created by MACHADO Jordan on 05/01/2016.
//  Copyright © 2016 MACHADO Jordan. All rights reserved.
//

#import "JardinViewController.h"
#import <IFTTTJazzHands.h>
#import "RecolteViewController.h"

@interface JardinViewController ()
@property (nonatomic, strong) IFTTTAnimator *animator;

//jardin1
@property (nonatomic, strong) UIImageView *jardin_background;
@property (nonatomic, strong) UIImageView *jardin_text;

//jardin2
@property (nonatomic, strong) UIImageView *jardin_background2;
@property (nonatomic, strong) UIImageView *jardin_text2;


@property (nonatomic, strong) UIButton *button;


@end

@implementation JardinViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.scrollView.delegate = self;
    self.scrollView.contentSize = CGSizeMake( self.scrollView.bounds.size.width*2, self.scrollView.bounds.size.height);
    self.pageControl.numberOfPages = 2;
    self.scrollView.showsHorizontalScrollIndicator = NO;
    self.animator = [IFTTTAnimator new];
    [self configureViews];
    [self configureAnimations];
    
    // Do any additional setup after loading the view.
}



- (void)configureViews
{
    
    [self configureJardin1];
    [self configureJardin2];
    [self configureButton];

}

-(void)configureJardin1 {
    
    self.jardin_background = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"jardin_background.jpg"]];
    self.jardin_background.frame = CGRectMake(0,-20,self.view.bounds.size.width,self.view.bounds.size.height);
    [self.scrollView addSubview:self.jardin_background];
    
    
    
    self.jardin_text = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"jardin-text.png"]];

    self.jardin_text.contentMode = UIViewContentModeScaleAspectFit;
    
    
    self.jardin_text.frame = CGRectMake(self.view.bounds.size.width/2 - self.jardin_text.bounds.size.width/2,
                                        self.scrollView.bounds.size.height-self.jardin_text.bounds.size.height,
                                        self.jardin_text.bounds.size.width,
                                        self.jardin_text.bounds.size.height);
    
    [self.scrollView addSubview:self.jardin_text];

    
}

-(void)configureJardin2 {
    
    self.jardin_background2 = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"jardin_background2.jpg"]];
    self.jardin_background2.frame = CGRectMake(self.view.bounds.size.width,-20,self.view.bounds.size.width,self.view.bounds.size.height);
    [self.scrollView addSubview:self.jardin_background2];
    
    
    
    self.jardin_text2 = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"jardin-text.png"]];
    
    self.jardin_text2.contentMode = UIViewContentModeScaleAspectFit;
    
    
    self.jardin_text2.frame = CGRectMake(self.view.bounds.size.width+self.view.bounds.size.width/2 - self.jardin_text2.bounds.size.width/2,
                                        self.scrollView.bounds.size.height-self.jardin_text2.bounds.size.height,
                                        self.jardin_text2.bounds.size.width,
                                        self.jardin_text2.bounds.size.height);
    
    [self.scrollView addSubview:self.jardin_text2];
    
    
}
-(void)configureButton {
    self.button = [UIButton buttonWithType:UIButtonTypeCustom];
    
  
    
    
    [self.button addTarget:self
               action:@selector(onTouchUpInsideGo:)
     forControlEvents:UIControlEventTouchUpInside];
    [self.button setTitleColor:[UIColor colorWithRed:0.855 green:0.451 blue:0.431 alpha:1] forState:UIControlStateNormal];


    [self.button setTitle:@"Accéder à cette récolte" forState:UIControlStateNormal];
    self.button.frame = CGRectMake(self.view.bounds.size.width - 250., self.scrollView.bounds.size.height, 250.0, 40.0);
    
    UIView *bottomBorder = [[UIView alloc] initWithFrame:CGRectMake(0, self.button.frame.size.height - 1.0f, self.button.frame.size.width, 3)];
    bottomBorder.backgroundColor = [UIColor colorWithRed:0.855 green:0.451 blue:0.431 alpha:1];
    
    [self.button addSubview:bottomBorder];

    
    [self.scrollView addSubview:self.button];
    
}

-(IBAction)onTouchUpInsideGo:(id)sender {
    NSLog(@"yolo");
    [self performSegueWithIdentifier:@"recolte" sender:self];

}

-(void)configureAnimations {
    
    [self animJadin1];
    [self animJadin2];
    [self animButton];
    
}

-(void)animJadin1{

    IFTTTScaleAnimation *backgroundScaleAnim = [IFTTTScaleAnimation animationWithView:self.jardin_background];
    [backgroundScaleAnim addKeyframeForTime:0 scale:1];
    [backgroundScaleAnim addKeyframeForTime:1 scale:0.8 withEasingFunction:IFTTTEasingFunctionEaseInOutQuad];
    [self.animator addAnimation: backgroundScaleAnim];
    
    IFTTTScaleAnimation *textScaleAnim = [IFTTTScaleAnimation animationWithView:self.jardin_text];
    [textScaleAnim addKeyframeForTime:0 scale:1];
    [textScaleAnim addKeyframeForTime:1 scale:0.8 withEasingFunction:IFTTTEasingFunctionEaseInOutQuad];
    [self.animator addAnimation: textScaleAnim];
    
    
    IFTTTTranslationAnimation *textTranslate = [IFTTTTranslationAnimation animationWithView:self.jardin_text];
    [textTranslate addKeyframeForTime:0 translation:CGPointMake(0, 0)];
    [textTranslate addKeyframeForTime:1 translation:CGPointMake(-160, 0)];
    [self.animator addAnimation: textTranslate];

}
-(void)animJadin2{
    IFTTTScaleAnimation *background2ScaleAnim = [IFTTTScaleAnimation animationWithView:self.jardin_background2];
    [background2ScaleAnim addKeyframeForTime:1 scale:1];
    [background2ScaleAnim addKeyframeForTime:2 scale:0.8 withEasingFunction:IFTTTEasingFunctionEaseInOutQuad];
    [self.animator addAnimation: background2ScaleAnim];
    
    IFTTTScaleAnimation *text2ScaleAnim = [IFTTTScaleAnimation animationWithView:self.jardin_text2];
    [text2ScaleAnim addKeyframeForTime:1 scale:1];
    [text2ScaleAnim addKeyframeForTime:2 scale:0.8 withEasingFunction:IFTTTEasingFunctionEaseInOutQuad];
    [self.animator addAnimation: text2ScaleAnim];
    
    
    IFTTTTranslationAnimation *text2Translate = [IFTTTTranslationAnimation animationWithView:self.jardin_text2];
    [text2Translate addKeyframeForTime:1 translation:CGPointMake(0, 0)];
    [text2Translate addKeyframeForTime:2 translation:CGPointMake(-160, 0)];
    [self.animator addAnimation: text2Translate];
    
}

-(void)animButton {
    IFTTTScaleAnimation *buttonScaleAnim = [IFTTTScaleAnimation animationWithView:self.button];
    [buttonScaleAnim addKeyframeForTime:0 scale:1];
    [buttonScaleAnim addKeyframeForTime:1 scale:0.8 withEasingFunction:IFTTTEasingFunctionEaseInOutQuad];
    [self.animator addAnimation: buttonScaleAnim];
    
    
    IFTTTTranslationAnimation *buttonTranslate = [IFTTTTranslationAnimation animationWithView:self.button];
    [buttonTranslate addKeyframeForTime:0 translation:CGPointMake(0, 0)];
    [buttonTranslate addKeyframeForTime:1 translation:CGPointMake(-120, 0)];
    [self.animator addAnimation: buttonTranslate];

    
}

- (void)scrollViewDidScroll:(UIScrollView *)scrollView
{
    [self.animator animate:scrollView.contentOffset.x/self.scrollView.bounds.size.width];
}



- (void)scrollViewDidEndDecelerating:(UIScrollView *)scrollView
{
    // switch the indicator when more than 50% of the previous/next page is visible
    CGFloat pageWidth = CGRectGetWidth(self.scrollView.frame);
    NSUInteger page = floor((self.scrollView.contentOffset.x - pageWidth / 2) / pageWidth) + 1;
    self.pageControl.currentPage= page;
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
