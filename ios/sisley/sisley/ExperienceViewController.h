//
//  ExperienceViewController.h
//  sisley
//
//  Created by MACHADO Jordan on 04/11/2015.
//  Copyright © 2015 MACHADO Jordan. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ExperienceViewController : UIViewController <UIWebViewDelegate>
@property (weak, nonatomic) IBOutlet UIWebView *webview;
@property (strong,nonatomic) NSString *url;


@end
