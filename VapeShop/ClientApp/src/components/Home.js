import React, { Component } from 'react';
import { Products } from './Products';
import { Carousel, Breadcrumb } from 'react-bootstrap'
import { Resource } from './utilities/Resource';
export class Home extends Component {
  displayName = Home.name

  render() {
    return (
      <div>
        <PromotedCarousel />
        <PathIndicator />
        <Products />
      </div>
    );
  }
}

const PathIndicator = (props) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
      <Breadcrumb.Item
        href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
        Library
     </Breadcrumb.Item>
      <Breadcrumb.Item active>Data</Breadcrumb.Item>
    </Breadcrumb>
  );
}

const Categories = (props) => {

  const promoted = [
    {
      title: 'title',
      description: 'description',
      image: 'img1'
    },
    {
      title: 'title',
      description: 'description',
      image: 'img1'
    }
  ];
  const content = (data) => {
    return <div></div>
  }
  return <Resource
    path={'path'}
    render={content}
  />
}

const PromotedCarousel = (props) => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          alt="First slide"
          src="images/img1.jpg"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          alt="Second slide"
          src="images/img2.jpg"
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images/img3.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}