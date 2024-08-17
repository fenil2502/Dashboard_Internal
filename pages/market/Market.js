import React, { Component } from 'react';
import Link from 'next/link';

class Market extends Component {
  render() {
    return (
      <div className="market-page">
        <h3>Buy what ever you want:</h3>
        <div className="product-listing">
        <div className="product">
                <div className="product-img">
                    <img src="./Product.png" alt="Product"/>
                </div>
                <div className="product-detail">
                    <div className="detail-left">
                        <h5>Product one</h5>
                        <Link href="#"><a>Buy now</a></Link>
                    </div>
                    <div className="detail-right">
                        <span>$99</span>
                    </div>
                </div>
            </div>
            <div className="product">
                <div className="product-img">
                    <img src="./Product.png" alt="Product"/>
                </div>
                <div className="product-detail">
                    <div className="detail-left">
                        <h5>Product one</h5>
                        <Link href="#"><a>Buy now</a></Link>
                    </div>
                    <div className="detail-right">
                        <span>$99</span>
                    </div>
                </div>
            </div>
            <div className="product">
                <div className="product-img">
                    <img src="./Product.png" alt="Product"/>
                </div>
                <div className="product-detail">
                    <div className="detail-left">
                        <h5>Product one</h5>
                        <Link href="#"><a>Buy now</a></Link>
                    </div>
                    <div className="detail-right">
                        <span>$99</span>
                    </div>
                </div>
            </div>
            <div className="product">
                <div className="product-img">
                    <img src="./Product.png" alt="Product"/>
                </div>
                <div className="product-detail">
                    <div className="detail-left">
                        <h5>Product one</h5>
                        <Link href="#"><a>Buy now</a></Link>
                    </div>
                    <div className="detail-right">
                        <span>$99</span>
                    </div>
                </div>
            </div>
            <div className="product">
                <div className="product-img">
                    <img src="./Product.png" alt="Product"/>
                </div>
                <div className="product-detail">
                    <div className="detail-left">
                        <h5>Product one</h5>
                        <Link href="#"><a>Buy now</a></Link>
                    </div>
                    <div className="detail-right">
                        <span>$99</span>
                    </div>
                </div>
            </div>
            <div className="product">
                <div className="product-img">
                    <img src="./Product.png" alt="Product"/>
                </div>
                <div className="product-detail">
                    <div className="detail-left">
                        <h5>Product one</h5>
                        <Link href="#"><a>Buy now</a></Link>
                    </div>
                    <div className="detail-right">
                        <span>$99</span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Market;