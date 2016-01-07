//
//  MapViewController.m
//  sisley
//
//  Created by MACHADO Jordan on 07/01/2016.
//  Copyright © 2016 MACHADO Jordan. All rights reserved.
//

#import "MapViewController.h"
#import "Annotation.h"
#define METERS_PER_MILE 1609.344

@interface MapViewController ()

@end

@implementation MapViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.mapView.delegate = self;
    CLLocationCoordinate2D zoomLocation;
    zoomLocation.latitude =  48.83713;
    zoomLocation.longitude= 2.3537726;
    
   
    MKCoordinateRegion viewRegion = MKCoordinateRegionMakeWithDistance(zoomLocation, 0.5*METERS_PER_MILE, 0.5*METERS_PER_MILE);
    
  
    
    Annotation *ann = [[Annotation alloc] init];
    ann.coordinate =zoomLocation;
    [self.mapView addAnnotation:ann];
    
    // 3
    [self.mapView setRegion:viewRegion animated:YES];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
- (IBAction)onBack:(id)sender {
        [self.navigationController popViewControllerAnimated:YES];
    
}

-(MKAnnotationView *) mapView:(MKMapView *)mapView viewForAnnotation:(id<MKAnnotation>)annotation {
    MKPinAnnotationView *MyPin=[[MKPinAnnotationView alloc] initWithAnnotation:annotation reuseIdentifier:@"current"];
    //MyPin.pinColor = MKPinAnnotationColorPurple;
    
    UIButton *advertButton = [UIButton buttonWithType:UIButtonTypeDetailDisclosure];
    [advertButton addTarget:self action:@selector(button:) forControlEvents:UIControlEventTouchUpInside];
    
    /*MyPin.rightCalloutAccessoryView = advertButton;
     MyPin.draggable = YES;
     
     MyPin.animatesDrop=TRUE;
     MyPin.canShowCallout = YES;*/
    MyPin.highlighted = NO;
    MyPin.image = [UIImage imageNamed:@"pin"];

    
    return MyPin;
}

- (IBAction)button:(id)sender {
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
