//
//  InscriptionViewController.m
//  sisley
//
//  Created by MACHADO Jordan on 07/01/2016.
//  Copyright © 2016 MACHADO Jordan. All rights reserved.
//

#import "InscriptionViewController.h"

@interface InscriptionViewController ()

@end

@implementation InscriptionViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
- (IBAction)validey:(id)sender {
    //[self performSegueWithIdentifier:@"jardin" sender:self];
}
- (IBAction)back:(id)sender {
        [self.navigationController popViewControllerAnimated:YES];
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
