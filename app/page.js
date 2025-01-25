"use client";

import React, { useRef, useEffect, useState } from "react";
import { RichText, combineCollections } from "readcv";
import useResizeObserver from "use-resize-observer";
import "@fontsource-variable/inter";

import cv from "./cv";

function App() {
  let collections = cv.allCollections;
  const excludedSections = [
    "Projects",
    "Side Projects",
    "Exhibitions",
    "Speaking",
  ];
  collections = collections.filter(
    (obj) => !excludedSections.includes(obj.name)
  );
  let allProjects = combineCollections(cv.projects, cv.sideProjects);
  collections = [{ title: "Work", items: allProjects }, ...collections];

  useEffect(() => {
    const onWheel = (e) => {
      if (e.deltaY == 0) return;
      e.preventDefault();
      document.body.scrollTo({
        left: document.body.scrollLeft + e.deltaY,
      });
    };
    document.body.addEventListener("wheel", onWheel, { passive: false });
    return () =>
      document.body.removeEventListener("wheel", onWheel, { passive: false });
  }, []);

  return (
    <div className="container">
      <Scrollbar />
      <About />
      {collections.map((collection, index) => {
        if (collection.name === "Contact") {
          return;
        }
        return (
          <Collection
            key={index}
            collection={collection.items}
            heading={collection.name}
          />
        );
      })}
      <RainbowBar />
    </div>
  );
}

function About(props) {
  return (
    <Column heading={cv.general.displayName}>
      <RichText text={cv.general.about} />
      <p>
        {cv.contact.map((contactItem, index) => {
          let comma;
          if (index < cv.contact.length - 1) {
            comma = ", ";
          }

          return (
            <span key={index}>
              <a href={contactItem.url} target="_blank">
                {contactItem.platform}
              </a>
              {comma}
            </span>
          );
        })}
      </p>
    </Column>
  );
}

function Attachments(props) {
  if (!props.attachments || props.attachments.length < 1) {
    return;
  }

  return (
    <div className="attachments">
      <div className="scrollableRegion">
        <div className="layout">
          {props.attachments.map((item, index) => {
            return <Attachment key={index} attachment={item} />;
          })}
        </div>
      </div>
    </div>
  );
}

function Attachment(props) {
  let attachment =
    props.attachment.type === "image" ? (
      <img loading="lazy" src={props.attachment.url} />
    ) : (
      <video
        loading="lazy"
        src={props.attachment.url}
        autoPlay
        muted
        playsInline
        loop
      />
    );
  return (
    <div
      style={{
        aspectRatio: props.attachment.width + "/" + props.attachment.height,
      }}
      className="attachment"
    >
      {attachment}
    </div>
  );
}

function Collection(props) {
  const [attachments, setAttachments] = useState([]);

  if (!props.collection) {
    return;
  }

  useEffect(() => {
    props.collection.forEach((experience) => {
      experience.attachments.forEach((attachment) => {
        let newAttachment = attachment;
        setAttachments((attachments) => [...attachments, newAttachment]);
      });
    });
  }, []);

  return (
    <Column heading={props.heading}>
      {props.collection.map((exp, index) => {
        return (
          <Experience
            key={index}
            url={exp.url}
            year={exp.year}
            title={exp.heading}
            description={exp.description}
            attachments={exp.attachments}
          />
        );
      })}
    </Column>
  );
}

function Column(props) {
  let [containerWidth, setContainerWidth] = useState();
  let containerRef = useRef(null);

  useEffect(() => {
    measure();
  }, []);

  const measure = () => {
    if (!containerRef.current) {
      return;
    }
    let width = containerRef.current.scrollWidth;
    setContainerWidth(width);
  };

  let heading;
  if (props.heading) {
    heading = <h2>{props.heading}</h2>;
  }

  const onResize = () => {
    measure();
  };

  useResizeObserver({ ref: containerRef, onResize });

  return (
    <div className="section">
      {heading}
      <div
        className="columnWrap"
        style={{
          width: containerWidth ?? undefined,
        }}
      >
        <div ref={containerRef} className="columns">
          {props.children}
        </div>
      </div>
    </div>
  );
}

function Experience(props) {
  let title;
  if (props.url) {
    title = (
      <a href={props.url} target="_blank">
        {props.title}
      </a>
    );
  } else {
    title = props.title;
  }

  return (
    <div className="experience">
      <div className="year">{props.year}</div>
      <div className="title">{title}</div>
      {props.description ? (
        <div className="description">
          <RichText text={props.description} />
        </div>
      ) : null}
      <Attachments attachments={props.attachments} />
    </div>
  );
}

function RainbowBar(props) {
  return <div className="bg-rainbow similar-scrollbar scrollbar"></div>;
}

function Scrollbar(props) {
  if (typeof window === "undefined") return null;
  const [isScrollable, setIsScrollable] = useState(false);
  const [renderCount, setRenderCount] = useState(0);
  const bodyRef = useRef(document.body);
  const trackRef = useRef(null);

  useEffect(() => {
    let view = bodyRef.current;
    const onScroll = (e) => {
      if (!bodyRef.current) {
        return;
      }
      setRenderCount((count) => count + 1);
    };
    view.addEventListener("scroll", onScroll);
    return () => view.removeEventListener("scroll", onScroll);
  }, []);

  const onResize = () => {
    let container = bodyRef.current;
    if (container && container.scrollWidth > container.offsetWidth) {
      setIsScrollable(true);
    } else {
      setIsScrollable(false);
    }
    setRenderCount((count) => count + 1);
  };

  useResizeObserver({ ref: bodyRef, onResize });
  const barWidth = bodyRef.current
    ? bodyRef.current.offsetWidth / bodyRef.current.scrollWidth
    : 0;
  const trackWidth = trackRef.current ? trackRef.current.offsetWidth : 0;
  const barPos = bodyRef.current
    ? bodyRef.current.scrollLeft /
      (bodyRef.current.scrollWidth - bodyRef.current.offsetWidth)
    : 0;

  if (!isScrollable) {
    return null;
  }

  return (
    <div className="scrollbar">
      <div className="track" ref={trackRef}>
        <div
          style={{
            width: barWidth * 100 + "%",
            transform:
              "translateX(" + (1 - barWidth) * trackWidth * barPos + "px)",
          }}
          className="slider"
        />
      </div>
    </div>
  );
}

export default App;
