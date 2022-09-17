import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// import { ProfileService } from 'app/main/pages/profile/profile.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit, OnDestroy {
  // public
  public contentHeader: object;
  public data: any;
  public toggleMenu = true;
  public Monthly = false;
  public toggleNavbarRef = false;
  public loadMoreRef = false;

  // private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {PricingService} _pricingService
   */
  constructor(
    //   private _pricingService: ProfileService, 
      private sanitizer: DomSanitizer) {
    this._unsubscribeAll = new Subject();
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Load More
   */
  loadMore() {
    this.loadMoreRef = !this.loadMoreRef;
    setTimeout(() => {
      this.loadMoreRef = !this.loadMoreRef;
    }, 2000);
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // this._pricingService.onPricingChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
    //   this.data = response;
    // });

    // content header
    this.contentHeader = {
      headerTitle: 'Dashboard',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'CvTech',
            isLink: true,
            link: '/'
          },
          {
            name: 'Dashboard',
            isLink: false
          }
        ]
      }
    };
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
