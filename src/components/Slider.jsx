import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase.config';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/a11y';
import Spinner from './Spinner';


function Slider() {
    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

        const fetchListings = async () => {
            const listingsRef = collection(db, 'listings');
            const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5));
            const querySnap = await getDocs(q);

            let listings = [];

            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data(),
                })
            });

            setListings(listings);
            setLoading(false);
        }

        fetchListings();
    }, []);

    if (loading) {
        return <Spinner />
    }

    if (listings.length === 0) {
        return <div></div>
    }

    return listings && (
        <div>
            <p className="exploreHeading">Recommended</p>

            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                slidesPerView={1}
                pagination={{ clickable: true }}
                style={{ height: '250px' }}
            >
                {listings.map(({ data, id }) => (
                    <SwiperSlide key={id} onClick={() => navigate(`/category/${data.type}/${id}`)}>
                        <div
                            style={{
                                background: `url(${data.imageUrls[0]}) center no-repeat`,
                                backgroundSize: 'cover',
                            }}
                            className="swiperSlideDiv">
                            <p className="swiperSlideText">{data.name}</p>
                            <p className="swiperSlidePrice">${data.discountedPrice ?? data.regularPrice}
                                {data.type === 'rent' && ' / month'}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                slidesPerView={1}
                pagination={{ clickable: true }}
                navigation
                style={{ height: '300px' }}
            >
                {listing.imageUrls.map((url, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <div
                                className='swiperSlideDiv'
                                style={{
                                    background: `url(${listing.imageUrls[index]}) center no-repeat`,
                                    backgroundSize: 'cover',
                                }}
                            ></div>
                        </SwiperSlide>
                    );
                })}
            </Swiper> */}
        </div>
    )
}

export default Slider