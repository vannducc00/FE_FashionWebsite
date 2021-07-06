import React, { Component } from 'react'
import "../Style/style.css"


export default class Footer extends Component {
    render() {
        return (
            <div style={{ paddingTop: "50px" }}>
                <div className="container-fluid con-footer-1">
                    <img src="https://www.dior.com/couture/var/dior/storage/images/horizon/store-locator-banner-onedior/14406329-114-int-EN/store-locator-banner-onedior2_1440_1200.jpg" alt="" style={{ width: "100%" }} />

                    <div className="search-contact">
                        <div className="enter-email">
                            <input type="text" placeholder="City, Post code, Contry" />
                            <i class="fal fa-search" ></i>
                        </div>
                        <i class="fab fa-facebook"></i>
                        <i class="fab fa-instagram"></i>
                        <i class="fab fa-weixin"></i>
                        <i class="fab fa-pinterest"></i>
                    </div>
                </div>
                <div className="container" style={{ padding: "30px 0" }}>
                    <div className="row">
                        <div className="col-3 category-e">
                            <ul>
                                <li className="item"><p>STORE LOCATOR</p></li>
                                <li className="item"><p>Find a Boutique</p></li>
                                <li className="item"><p>Fashion Watches Stores</p></li>
                            </ul>
                        </div>
                        <div className="col-3 category-e">
                            <ul>
                                <li className="item">
                                    <p>CUSTOMER CARE</p>
                                </li>
                                <li className="item">
                                    <p>Exclusive Services</p>
                                </li>
                                <li className="item">
                                    <p>Contact Us</p>
                                </li>
                                <li className="item">
                                    <p>FAQs</p>
                                </li>
                                <li className="item">
                                    <p>Orders & Shipping</p>
                                </li>
                                <li className="item">
                                    <p>Returns & Refunds</p>
                                </li>
                            </ul>
                        </div>
                        <div className="col-3 category-e">
                            <ul>
                                <li className="item"> <p> ABOUT US</p></li>
                                <li className="item"> <p> Company Profile</p></li>
                                <li className="item"> <p> Corporate Data</p></li>
                                <li className="item"> <p> Investor Relations</p></li>
                                <li className="item"> <p> Careers</p></li>
                            </ul>
                        </div>
                        <div className="col-3 category-e">
                            <ul>
                                <li className="item">
                                    <p>LEGAL</p>
                                </li>
                                <li className="item">
                                    <p>Legal Notes</p>
                                </li>
                                <li className="item">
                                    <p>Terms & Conditions</p>
                                </li>
                                <li className="item">
                                    <p>General Conditions of Purchase</p>
                                </li>
                                <li className="item">
                                    <p>Code of Business Conduct and Ethics</p>
                                </li>
                                <li className="item">
                                    <p>Privacy Policy</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
