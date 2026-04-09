import Autoplay from "embla-carousel-autoplay";
import React, { useMemo } from "react";
import { statsCard } from "@/constants/dashboard";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Heading } from "../ui/Headings";

function Stats({ stats }) {
    const autoplayPlugin = useMemo(
        () =>
            Autoplay({
                delay: 3000,
                stopOnInteraction: false,
                stopOnFocusIn: true,
                stopOnMouseEnter: true,
            }),
        []
    );

    return (
        <Carousel
            plugins={[autoplayPlugin]}
            opts={{
                loop: true,
                align: "start",
            }}
        >
            <CarouselContent>
                {statsCard(stats).map((stat, idx) => (
                    <CarouselItem
                        key={idx}
                        className="basis-1/1 md:basis-1/2 xl:basis-1/3 2xl:basis-1/4"
                    >
                        <Card key={idx}>
                            <CardHeader>
                                <Heading size="p">{stat.title}</Heading>
                            </CardHeader>
                            <CardContent>
                                <Heading size="h2" className={"font-bold"}>
                                    {stat.value}
                                </Heading>
                            </CardContent>
                            <CardFooter>
                                <Heading size="p" className={"line-clamp-1"}>
                                    {stat.description}
                                </Heading>
                            </CardFooter>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
}

export default Stats;
