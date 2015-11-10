//
//  UIViewController+Menu.m
//  sisley
//
//  Created by MACHADO Jordan on 04/11/2015.
//  Copyright © 2015 MACHADO Jordan. All rights reserved.
//

#import "UIViewController+Menu.h"
#import "AppViewController.h"


@implementation UIViewController (Menu)


-(void)addMenuBtn {
    UIButton *button = [UIButton buttonWithType:UIButtonTypeCustom];
    [button addTarget:self
               action:@selector(onTouchUpInsideMenuBtn:)
     forControlEvents:UIControlEventTouchUpInside];
    [button setBackgroundImage:[UIImage imageNamed:@"menu.png"]
                        forState:UIControlStateNormal];
    button.frame = CGRectMake(10.0, 20.0, 40.0, 40.0);
    [self.view addSubview:button];
}
- (IBAction)onTouchUpInsideMenuBtn:(id)sender {
    [self showMenu];
}
-(void)removeMenuBtn {
    
}
-(void)showMenu {
    UIStoryboard *sb = [UIStoryboard storyboardWithName:@"Shaker" bundle:nil];
    UIViewController *menu = [sb instantiateInitialViewController];
    [self.view addSubview:menu.view];
}
-(void)hideMenu {
    
}
@end
