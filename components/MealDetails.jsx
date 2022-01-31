import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";

const MealDetails = ({
  title = null,
  image = null,
  ytVideoID = null,
  text = null,
  tags = null,
  category = null,
  area = null,
}) => {
  return (
    <>
      <Card>
        <Row>
          <Col md="6">
            <div className="card-header">
              {image ? (
                <Image
                  className="card-img-top"
                  src={image}
                  width={100}
                  height={100}
                  layout="responsive"
                  alt={title}
                />
              ) : (
                ""
              )}
            </div>
          </Col>

          <Col md="6">
            <div className="card-body">
              {title ? <h2 className="card-title">{title}</h2> : ""}

              {category || area ? (
                <div className="meal-details mb-3">
                  {category ? (
                    <font className="meal-cate">
                      <b>category:</b> {category}
                    </font>
                  ) : (
                    ""
                  )}
                  {area ? (
                    <font className="meal-cate">
                      <b>area:</b> {area}
                    </font>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}

              {text ? (
                <p
                  className="card-text"
                  dangerouslySetInnerHTML={{ __html: text }}
                ></p>
              ) : (
                ""
              )}

              {tags ? (
                <div className="meal-tags mt-4">
                  {tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/search/?q=${tag
                        .toLowerCase()
                        .split(" ")
                        .join("-")}`}
                    >
                      <a className="meal-tag btn btn-sm btn-outline-primary">
                        <b>#</b>
                        {tag}
                      </a>
                    </Link>
                  ))}
                </div>
              ) : (
                ""
              )}
            </div>
          </Col>
        </Row>
      </Card>

      {ytVideoID ? (
        <div className="meal-video mt-5">
          <div className="ratio ratio-16x9">
            <iframe
              src={`https://www.youtube.com/embed/${ytVideoID}`}
              title="YouTube video"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default MealDetails;
