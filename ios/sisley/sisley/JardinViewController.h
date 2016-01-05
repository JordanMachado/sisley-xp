//
//  JardinViewController.h
//  sisley
//
//  Created by MACHADO Jordan on 05/01/2016.
//  Copyright © 2016 MACHADO Jordan. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface JardinViewController : UIViewController <UIScrollViewDelegate> 
@property (weak, nonatomic) IBOutlet UIScrollView *scrollView;
@property (weak, nonatomic) IBOutlet UIPageControl *pageControl;

@end
