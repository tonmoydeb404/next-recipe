import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Card } from "react-bootstrap";

const MealCard = ({
  className = "",
  image = null,
  altText = null,
  title = null,
  url = null,
  text = null,
}) => {
  const modifiedText = text ? text.split(" ").slice(0, 20).join(" ") : "";
  const modifiedUrl = url ? url.split(" ").join("-").toLowerCase() : "";

  return (
    <Card className={className}>
      {image ? (
        <Link href={modifiedUrl}>
          <a>
            <div className="d-block">
              <Image
                src={image}
                width={100}
                height={100}
                alt={altText || title}
                className="card-img-top"
                layout="responsive"
              />
            </div>
          </a>
        </Link>
      ) : (
        ""
      )}

      <div className="card-body">
        {title ? (
          <Link href={modifiedUrl}>
            <a>
              <h2 className="card-title h5 text-bold">{title}</h2>
            </a>
          </Link>
        ) : (
          ""
        )}

        {text ? <p className="card-text">{modifiedText}.</p> : ""}
      </div>
    </Card>
  );
};

export default MealCard;
