import { Component, OnInit } from '@angular/core';
declare var jQuery:any;
declare var $ :any;

declare var Metronic;
declare var Layout;
declare var Demo;
declare var Tasks;


@Component({
    selector: 'app-customer-sidebar',
    templateUrl: './customer-sidebar.component.html',
    styleUrls: ['./customer-sidebar.component.scss']
})
export class CustomerSidebarComponent implements OnInit {
    constructor() {}

    ngOnInit() {
        
    	var url = window.location;
        $('.page-sidebar-menu a').filter(function() {
            return this.href == url;
        }).parent('li').addClass('active');

        jQuery(document).ready(function() {    
           Metronic.init(); // init metronic core componets
           Layout.init(); // init layout
           Demo.init(); // init demo features 
           /*Index.init(); // init index page*/
         Tasks.initDashboardWidget(); // init tash dashboard widget  
        });
        /*layout*/

        var menu = $('.page-sidebar-menu');

        menu.find('li.active').removeClass('active');
        menu.find('li > a > .selected').remove();

        if (menu.hasClass('page-sidebar-menu-hover-submenu') === false) {
            menu.find('li.open').each(function(){
                if ($(this).children('.sub-menu').size() === 0) {
                    $(this).removeClass('open');
                    $(this).find('> a > .arrow.open').removeClass('open');
                }                             
            }); 
        } else {
            menu.find('li.open').removeClass('open');
        }


    }
}
