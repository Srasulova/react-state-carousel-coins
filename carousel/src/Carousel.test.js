import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("renders without crashing", function () {
  render(<Carousel photos={TEST_IMAGES} title="images for testing" />);
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

it("works when you click on the left arrow", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  const rightArrow = container.querySelector(".bi-arrow-right-circle");

  // move forward in the carousel
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();

  // select the left arrow after moving forward
  const leftArrow = container.querySelector(".bi-arrow-left-circle");

  // move backward in the carousel
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
});

it("hides left arrow on the first image", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  const leftArrow = container.querySelector(".bi-arrow-left-circle");

  // expect the left arrow not to be in the document
  expect(leftArrow).not.toBeInTheDocument();
});

it("hides right arrow on the last image", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  const rightArrow = container.querySelector(".bi-arrow-right-circle");

  // move forward in the carousel until the last image
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // expect the right arrow not to be in the document
  expect(rightArrow).not.toBeInTheDocument();
});
