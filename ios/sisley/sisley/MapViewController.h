//
//  MapViewController.h
//  sisley
//
//  Created by MACHADO Jordan on 07/01/2016.
//  Copyright © 2016 MACHADO Jordan. All rights reserved.
//

#import <UIKit/UIKit.h>
@import MapKit;
@interface MapViewController : UIViewController <MKMapViewDelegate>

@property (weak, nonatomic) IBOutlet MKMapView *mapView;

@end
