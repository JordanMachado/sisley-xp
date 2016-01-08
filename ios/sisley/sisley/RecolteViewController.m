//
//  RecolteViewController.m
//  sisley
//
//  Created by MACHADO Jordan on 06/01/2016.
//  Copyright © 2016 MACHADO Jordan. All rights reserved.
//

#import "RecolteViewController.h"
#import <IFTTTJazzHands.h>
#import <Social/Social.h>


@interface RecolteViewController ()

@property (nonatomic, strong) IFTTTAnimator *animator;



@property (nonatomic, strong) UIImageView *productTitle;
@property (nonatomic, strong) UIImageView *productText1;
@property (nonatomic, strong) UIImageView *productText2;

@property (nonatomic, strong) UIImageView *productImg;
@property (nonatomic, strong) UIImageView *productReco;
@property (nonatomic, strong) UIImageView *twitterImg;

@end

@implementation RecolteViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.pageControl.numberOfPages= 3;
    self.scrollView.delegate = self;
    self.scrollView.contentSize = CGSizeMake( self.view.bounds.size.width*4, self.scrollView.bounds.size.height);
    self.imageOverlay.center = CGPointMake(self.imageOverlay.bounds.size.width, 0);
    self.scrollView.showsHorizontalScrollIndicator = NO;
    
    self.pageControl.pageIndicatorTintColor = [UIColor colorWithRed:0.945 green:0.847 blue:0.851 alpha:1];
    self.pageControl.currentPageIndicatorTintColor = [UIColor colorWithRed:0.949 green:0.459 blue:0.443 alpha:1];
    
    self.animator = [IFTTTAnimator new];
    [self configureViews];
    [self configureAnimations];
    

    
    [UIView animateWithDuration:.4f delay:0 options:UIViewAnimationOptionCurveEaseOut animations:^{
               self.imageOverlay.center = CGPointMake(0, 0);
    } completion:NULL];
    
    [UIView animateWithDuration:.4f delay:.4f options:UIViewAnimationOptionCurveEaseOut animations:^{
        self.scrollView.contentOffset = CGPointMake(self.view.bounds.size.width, 0);
        [self.animator animate:self.scrollView.contentOffset.x/self.scrollView.bounds.size.width];
    } completion:NULL];


   
    // Do any additional setup after loading the view.
}

-(void)configureViews{
    [self configureView1];
    [self configureView2];
    [self configureView3];
}

-(void)configureAnimations{
    [self configureAnimationView1];
    [self configureAnimationView2];
    [self configureAnimationView3];

    
}

-(void)configureView1{
    self.productTitle = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"recolte-titre"]];
    self.productTitle.frame = CGRectMake(self.view.bounds.size.width+ 10,self.scrollView.bounds.size.height/3 +40,self.productTitle.bounds.size.width/ 1.8,self.productTitle.bounds.size.height/ 1.8);
    [self.scrollView addSubview:self.productTitle];
    
    self.productText1= [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"recolte-text1"]];
    self.productText1.frame = CGRectMake(self.view.bounds.size.width+ 10,self.scrollView.bounds.size.height/2+40,self.productText1.bounds.size.width/ 1.8,self.productText1.bounds.size.height/ 1.8);
    [self.scrollView addSubview:self.productText1];
    self.productImg = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"product.png"]];
    self.productImg.frame = CGRectMake(self.view.bounds.size.width*2 -self.productImg.bounds.size.width/1.6 - 30,-20,self.productImg.bounds.size.width/1.6,self.productImg.bounds.size.height/1.6);
    [self.scrollView addSubview:self.productImg];

}


-(void)configureAnimationView1{
    
    
    
    IFTTTScaleAnimation *textAnim = [IFTTTScaleAnimation animationWithView:self.productText1];
    [textAnim addKeyframeForTime:1 scale:1];
    [textAnim addKeyframeForTime:2 scale:0.8 withEasingFunction:IFTTTEasingFunctionEaseInOutQuad];
    [self.animator addAnimation: textAnim];
    
    
    IFTTTScaleAnimation *titleAnimScale = [IFTTTScaleAnimation animationWithView:self.productTitle];
    [titleAnimScale addKeyframeForTime:2 scale:1];
    [titleAnimScale addKeyframeForTime:3 scale:0.8 withEasingFunction:IFTTTEasingFunctionEaseInOutQuad];
    [self.animator addAnimation: titleAnimScale];
    
    IFTTTScaleAnimation *imageAnimScale = [IFTTTScaleAnimation animationWithView:self.productImg];
    [imageAnimScale addKeyframeForTime:2 scale:1];
    [imageAnimScale addKeyframeForTime:3 scale:0.8 withEasingFunction:IFTTTEasingFunctionEaseInOutQuad];
    [self.animator addAnimation: imageAnimScale];


    

    
    // KEEP NEXT VIEW
    
    IFTTTTranslationAnimation *textTranslate = [IFTTTTranslationAnimation animationWithView:self.productTitle];
    [textTranslate addKeyframeForTime:1 translation:CGPointMake(0, 0)];
    [textTranslate addKeyframeForTime:2 translation:CGPointMake(self.view.bounds.size.width , 0)];
    [self.animator addAnimation: textTranslate];
    
    
    IFTTTTranslationAnimation *imgTranslate = [IFTTTTranslationAnimation animationWithView:self.productImg];
    [imgTranslate addKeyframeForTime:1 translation:CGPointMake(0, 0)];
    [imgTranslate addKeyframeForTime:2 translation:CGPointMake(self.view.bounds.size.width, 0)];
    [self.animator addAnimation: imgTranslate];
    
    
    
    
    
   }

-(void)configureView2 {
    self.productText2= [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"recolte-text2"]];
    self.productText2.frame = CGRectMake(self.view.bounds.size.width*2+ 10,self.scrollView.bounds.size.height/2+50,self.productText2.bounds.size.width/ 1.8,self.productText2.bounds.size.height/ 1.8);
    [self.scrollView addSubview:self.productText2];

}

-(void)configureAnimationView2 {
    
    IFTTTScaleAnimation *textAnim2 = [IFTTTScaleAnimation animationWithView:self.productText2];
    [textAnim2 addKeyframeForTime:1 scale:0.8];
    [textAnim2 addKeyframeForTime:2 scale:1 withEasingFunction:IFTTTEasingFunctionEaseInOutQuad];
    [textAnim2 addKeyframeForTime:3 scale:0.8 withEasingFunction:IFTTTEasingFunctionEaseInOutQuad];
    [self.animator addAnimation: textAnim2];
    
}

-(void)configureView3 {
    self.productReco = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"product-page"]];
    self.productReco.frame = CGRectMake(self.view.bounds.size.width*3 ,-80,self.view.bounds.size.width,self.view.bounds.size.height);
    [self.scrollView addSubview:self.productReco];
  
}

-(void)configureAnimationView3 {
    IFTTTAlphaAnimation *overlayAlphaAnim = [IFTTTAlphaAnimation animationWithView:self.blackOverlay];
    [overlayAlphaAnim addKeyframeForTime:2 alpha:0];
    [overlayAlphaAnim addKeyframeForTime:3 alpha:0.5 withEasingFunction:IFTTTEasingFunctionEaseInOutQuad];
    [self.animator addAnimation: overlayAlphaAnim];
    
    IFTTTScaleAnimation *overlayScaleAnim = [IFTTTScaleAnimation animationWithView:self.productReco];
    [overlayScaleAnim addKeyframeForTime:2 scale:0.9 withEasingFunction:IFTTTEasingFunctionEaseInOutQuad];
    [overlayScaleAnim addKeyframeForTime:3 scale:1 withEasingFunction:IFTTTEasingFunctionEaseInOutQuad];
    [self.animator addAnimation: overlayScaleAnim];

}

- (IBAction)onTouchUpinside:(id)sender {
    //back
    [self.navigationController popViewControllerAnimated:YES];
}
- (IBAction)onTouchUpInsideStore:(id)sender {
    //store
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"http://www.sisley-paris.com/fr-FR/le-soin/soin-visage/soins-sisleya-global-anti-age.html"]];
}
- (IBAction)onTouchUpinsideShare:(id)sender {
    
    self.twitterImg = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"01_sisleya_twitter"]];
    SLComposeViewController *tweetSheet = [SLComposeViewController composeViewControllerForServiceType:SLServiceTypeTwitter];
    [tweetSheet setInitialText:@"J'ai récolté dans le jardin #SISLEY, la lavande, la réglisse et le tournesol. Mon produit du jour est SISLEŸA ! #MORI"];
    [tweetSheet addImage:self.twitterImg.image];
    [self presentViewController:tweetSheet animated:YES completion:nil];
    

}


- (void)scrollViewDidScroll:(UIScrollView *)scrollView
{
    [self.animator animate:scrollView.contentOffset.x/self.scrollView.bounds.size.width];
}

- (void)scrollViewDidEndDecelerating:(UIScrollView *)scrollView
{
    // switch the indicator when more than 50% of the previous/next page is visible
    CGFloat pageWidth = CGRectGetWidth(self.scrollView.frame);
    NSUInteger page = floor((self.scrollView.contentOffset.x - pageWidth / 2) / pageWidth);
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
