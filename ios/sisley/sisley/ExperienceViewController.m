//
//  ExperienceViewController.m
//  sisley
//
//  Created by MACHADO Jordan on 04/11/2015.
//  Copyright © 2015 MACHADO Jordan. All rights reserved.
//

#import "ExperienceViewController.h"



@interface ExperienceViewController ()

@end

@implementation ExperienceViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.webview.delegate = self;
    self.url = @"http://lacostewinter.seeourwork.cn/en/intro";
    [self.webview loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:self.url]]];
 
    
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)webViewDidFinishLoad:(UIWebView *)webView {
    NSLog(@"webview loaded");
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
