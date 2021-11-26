import React, { useState, useEffect } from 'react'
import "../Style/style.css"

export default function Footer() {
    let dataColFirst = ['STORE LOCATOR', 'Find a Boutique', 'Fashion Watches Stores']

    return (
        <div style={{ paddingTop: "50px" }}>
            <div className="container-fluid con-footer-1">
                <img src="https://www.dior.com/couture/var/dior/storage/images/horizon/store-locator-banner-onedior/14406329-114-int-EN/store-locator-banner-onedior2_1440_1200.jpg" alt="" style={{ width: "100%" }} />

                <div className="search-contact">
                    <div className="enter-email">
                        <input type="text" placeholder="City, Post code, Contry" />
                        <i className="fal fa-search" ></i>
                    </div>
                    <i className="fab fa-facebook"></i>
                    <i className="fab fa-instagram"></i>
                    <i className="fab fa-weixin"></i>
                    <i className="fab fa-pinterest"></i>
                </div>
            </div>
            {/* <div className="container px-8 py-5">
                <div className="row">
                    <div className="col-3 category-e">
                        <ul>
                            {dataColFirst.map((item, index) =>
                                <li className="py-1 text-xs" key={index} ><p>{item}</p></li>
                            )}
                        </ul>
                    </div>
                    <div className="col-3 category-e">
                        <ul>
                            <li className="py-1 text-sm">
                                <p>CUSTOMER CARE</p>
                            </li>
                            <li className="py-1 text-xs">
                                <p>Exclusive Services</p>
                            </li>
                            <li className="py-1 text-xs">
                                <p>Contact Us</p>
                            </li>
                            <li className="py-1 text-xs">
                                <p>FAQs</p>
                            </li>
                            <li className="py-1 text-xs">
                                <p>Orders & Shipping</p>
                            </li>
                            <li className="py-1 text-xs">
                                <p>Returns & Refunds</p>
                            </li>
                        </ul>
                    </div>
                    <div className="col-3 category-e">
                        <ul>
                            <li className="py-1 text-sm"> <p> ABOUT US</p></li>
                            <li className="py-1 text-xs"> <p> Company Profile</p></li>
                            <li className="py-1 text-xs"> <p> Corporate Data</p></li>
                            <li className="py-1 text-xs"> <p> Investor Relations</p></li>
                            <li className="py-1 text-xs"> <p> Careers</p></li>
                        </ul>
                    </div>
                    <div className="col-3 category-e">
                        <ul>
                            <li className="py-1 text-sm">
                                <p>LEGAL</p>
                            </li>
                            <li className="py-1 text-xs">
                                <p>Legal Notes</p>
                            </li>
                            <li className="py-1 text-xs">
                                <p>Terms & Conditions</p>
                            </li>
                            <li className="py-1 text-xs">
                                <p>General Conditions of Purchase</p>
                            </li>
                            <li className="py-1 text-xs">
                                <p>Code of Business Conduct and Ethics</p>
                            </li>
                            <li className="py-1 text-xs">
                                <p>Privacy Policy</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div> */}
        </div >
    )
}

