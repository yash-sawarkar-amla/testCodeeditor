
//Hello Corousel
//Hiiiiiiiiiiiiiiiiii there
//Vaishnavi  J
import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { RightArrow, LeftArrow } from "../Icons/Icon";
// import WidgetAgent from "@/agents/WidgetAgent";
import { CONSTANT } from "@/constant";
import "./Carousel.scss";
import DIContainer from "services/dependencyRegistration";
import IWidgetAgent from "@/iagents/IWidgetAgent";
import types from "services/dependencyRegistration/types";
import { IWidget } from "types/WidgetTypes";
import { IBannerData, ISliderBanners } from "types/Carousel";
import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";

const baseURL = CONSTANT.BASE_URL;

interface CarouselProps {
  showArrows?: boolean;
  selectedItem?: 0;
  showThumbs?: boolean;
  showIndicators?: boolean;
  autoPlay?: boolean;
  swipeable?: boolean;
  interval?: number;
  infiniteLoop?: boolean;
  showStatus?: boolean;
  stopOnHover?: boolean;
  WidgetName: string;
  WidgetKey: string;
  WidgetCode: string;
  TypeOfMapping: string;
  DisplayName: string;
  CMSMappingId: number;
  LocaleId: number;
  PublishCatalogId: number;
}

const BannerCarousel: React.FC<CarouselProps> = (props) => {
  const {
    showArrows = true,
    selectedItem = 0,
    showThumbs = false,
    showIndicators = true,
    autoPlay = true,
    swipeable = true,
    interval = 3000,
    infiniteLoop = true,
    showStatus = false,
    stopOnHover = false,
  } = props;

  const [data, setData] = useState<IBannerData | null>(null);
  // eslint-disable-next-line no-console

  /**
   * This function will fetch carousal data from api and stored in state
   */
  const fetchData = async () => {
    const sliderData = await DIContainer.get<IWidgetAgent>(types.WidgetAgent).getSliderData(props);
    setData(sliderData);
  };

  /**
   * Call fetchData function to store data in state when component mount.
   */
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * This function will return class name with text position of carousal
   * @param textAlign is string data type which will be left | center
   * @returns Class name on basis of string passed
   */
  const getTextPosition = (textAlign: string) => {
    const getPosition = "absolute top-1/2 -translate-y-2/4";

    const getAlignment = () => {
      if (textAlign === "Left") {
        return "text-left left-20";
      } else {
        if (textAlign === "Center") {
          return "text-center w-full";
        } else {
          if (textAlign === "Right") {
            return "text-right right-20";
          } else {
            return "text-left left-20";
          }
        }
      }
    };

    return `${getPosition} ${getAlignment()}`;
  };

  const renderCarouselBanners = (bannerData: IBannerData) => {
    return bannerData?.SliderBanners?.map((carouselData: ISliderBanners) => {
      return (
        <div className="relative" key={carouselData.BannerSequence}>
          <Link href={carouselData.ButtonLink} target="_blank">
            <img src={`${baseURL}Data/Media/${carouselData.MediaPath}`} alt={carouselData.ImageAlternateText} className="w-full" data-test-selector="imgMediaPath" />
            <div className={`${getTextPosition(carouselData.TextAlignment)}`}>
              <h3 className="lg:text-4xl md:text-3xl text-sm font-semibold uppercase text-white mb-3"></h3>
              <div className="lg:text-4xl md:text-3xl text-sm text-white break-words" dangerouslySetInnerHTML={{ __html: carouselData?.Description }}></div>
            </div>
          </Link>
        </div>
      );
    });
  };

  return (
    <>
      <Suspense fallback={<LoadingSkeleton type="card" />}>
        {data ? (
          <Carousel
            showArrows={showArrows}
            selectedItem={selectedItem}
            showThumbs={showThumbs}
            showIndicators={showIndicators}
            autoPlay={autoPlay}
            swipeable={swipeable}
            interval={interval}
            infiniteLoop={infiniteLoop}
            showStatus={showStatus}
            stopOnHover={stopOnHover}
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
              hasPrev && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  title={label}
                  className="left-arrow absolute right-32 bottom-2 sm:bottom-5 lg:bottom-10 z-10 
            bg-slate-100 hover:bg-gray-600 p-0 lg:p-1"
                >
                  <LeftArrow viewBox="0 0 25 24" width="30px" height="30px" />
                </button>
              )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
              hasNext && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  title={label}
                  className="right-arrow absolute right-20 bottom-2 sm:bottom-5 lg:bottom-10 z-10 
            bg-slate-100 hover:bg-gray-600 p-0 lg:p-1"
                >
                  <RightArrow viewBox="0 0 25 24" width="30px" height="30px" />
                </button>
              )
            }
          >
            {renderCarouselBanners(data)}
          </Carousel>
        ) : (
          <LoadingSkeleton type="card" />
        )}
      </Suspense>
    </>
  );
};

export default BannerCarousel;
