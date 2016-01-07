//
//  RecolteViewController.h
//  sisley
//
//  Created by MACHADO Jordan on 06/01/2016.
//  Copyright © 2016 MACHADO Jordan. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface RecolteViewController : UIViewController  <UIScrollViewDelegate> 

@property (weak, nonatomic) IBOutlet UIScrollView *scrollView;
@property (weak, nonatomic) IBOutlet UIPageControl *pageControl;
@property (weak, nonatomic) IBOutlet UIImageView *imageOverlay;
@property (weak, nonatomic) IBOutlet UIImageView *blackOverlay;

@end
