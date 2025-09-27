'use client'
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Users, Award, Truck, Shield, Star, Play, Pause, Scissors, Palette } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';

const MiahClothingAbout = () => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    const values = [
        {
            icon: <Heart className="h-8 w-8 text-black" />,
            title: "Designed with Passion",
            description: "Every piece of clothing is carefully designed with attention to detail and passion for fashion."
        },
        {
            icon: <Award className="h-8 w-8 text-black" />,
            title: "Premium Quality",
            description: "We source only the finest fabrics and work with skilled tailors to ensure lasting comfort."
        },
        {
            icon: <Users className="h-8 w-8 text-black" />,
            title: "Style for Everyone",
            description: "Creating versatile fashion that empowers individuals to express their unique style."
        },
        {
            icon: <Shield className="h-8 w-8 text-black" />,
            title: "Lifetime Support",
            description: "From delivery to care instructions, we're here to support your fashion journey."
        }
    ];

    const stats = [
        { number: "50K+", label: "Happy Customers" },
        { number: "10K+", label: "Fashion Pieces" },
        { number: "99.5%", label: "Customer Satisfaction" },
        { number: "8+", label: "Years Experience" }
    ];

    const galleryImages = [
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const toggleVideo = () => {
        if (isVideoPlaying) {
            if (videoRef.current) {
                videoRef.current.pause();
            }
            setIsVideoPlaying(false);
        } else {
            setIsVideoPlaying(true);
        }
    };

    return (
        <MobileLayout
            showBack={true}
        >

        <div className="min-h-screen bg-white overflow-hidden">
            {/* Hero Section with Background Image */}
            <section className="relative py-32 px-4 bg-gradient-to-br from-gray-100 via-white to-gray-200">
                <div className="absolute inset-0 opacity-10">
                    <img
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop"
                        alt="Fashion background"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative max-w-6xl mx-auto text-center">
                    <div className="animate-fade-in-up">
                        <h1 className="text-6xl font-bold text-gray-900 mb-6">
                            Welcome to <span className="text-black">Miah</span>
                        </h1>
                        <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
                            Elevating your wardrobe with contemporary fashion that combines timeless elegance,
                            exceptional quality, and modern style for the confident individual.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            <Badge className="px-6 py-3 text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300">
                                ✨ Premium Fashion
                            </Badge>
                            <Badge className="px-6 py-3 text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300">
                                🚚 Free Shipping
                            </Badge>
                            <Badge className="px-6 py-3 text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300">
                                🎨 Unique Designs
                            </Badge>
                        </div>
                        <Button size="lg" className="bg-black text-white hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg">
                            Explore Our Collection
                        </Button>
                    </div>
                </div>
            </section>

            {/* Stats Section with Animation */}
            <section className="py-16 px-4 bg-white border-y border-gray-100">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="text-4xl md:text-5xl font-bold text-black mb-2 transform group-hover:scale-110 transition-transform duration-300">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story Section with Images */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                                    The Miah Story
                                </h2>
                                <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                                    Founded in 2016 by passionate fashion designers, Miah began as a small boutique
                                    dedicated to creating exceptional clothing pieces. Our founders believed
                                    that everyone deserves fashion that tells their story and empowers their confidence.
                                </p>
                                <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                                    Today, we've grown into a trusted name in contemporary fashion, serving thousands of
                                    style-conscious individuals across the globe. From elegant dresses to sophisticated
                                    casual wear, every piece reflects our commitment to quality, comfort, and timeless style.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg transform hover:translate-x-2 transition-transform duration-300 border border-gray-200">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                        <Star className="h-6 w-6 text-black" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">2016</h3>
                                        <p className="text-gray-600">Miah Founded with a Single Boutique</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg transform hover:translate-x-2 transition-transform duration-300 border border-gray-200">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                        <Truck className="h-6 w-6 text-black" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">2019</h3>
                                        <p className="text-gray-600">Launched Global Online Store</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg transform hover:translate-x-2 transition-transform duration-300 border border-gray-200">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                        <Award className="h-6 w-6 text-black" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">2023</h3>
                                        <p className="text-gray-600">Best Fashion Brand Award Winner</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src={galleryImages[currentImageIndex]}
                                    alt="Miah fashion showcase"
                                    className="w-full h-full object-cover transition-opacity duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 text-white">
                                    <p className="text-sm opacity-90">Contemporary Fashion Collection</p>
                                </div>
                            </div>

                            {/* Image indicators */}
                            <div className="flex justify-center mt-4 space-x-2">
                                {galleryImages.map((_, index) => (
                                    <button
                                        title='Image indicator'
                                        type="button"
                                        key={index}
                                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === currentImageIndex ? 'bg-black' : 'bg-gray-300'
                                            }`}
                                        onClick={() => setCurrentImageIndex(index)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Section */}
            <section className="w-full bg-white">
                <div className="w-full">
                    {!isVideoPlaying ? (
                        <div className="w-full cursor-pointer" onClick={toggleVideo}>
                            <div className="relative w-full" style={{ paddingBottom: '25%' }}>
                                <img 
                                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&h=1080&fit=crop" 
                                    alt="Miah Fashion Design Process"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Button
                                        size="lg"
                                        className="bg-black hover:bg-gray-800 rounded-full w-20 h-20 flex items-center justify-center"
                                    >
                                        <Play className="h-8 w-8 ml-1 text-white" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full relative">
                            <video 
                                ref={videoRef}
                                className="w-full h-auto custom-video-player"
                                controls={false}
                                autoPlay
                                onPlay={() => setIsVideoPlaying(true)}
                                onPause={() => setIsVideoPlaying(false)}
                                onEnded={() => setIsVideoPlaying(false)}
                            >
                                <source src="/miah_desktop_280425.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                            <div className="absolute top-4 right-4">
                                <Button
                                    onClick={toggleVideo}
                                    className="bg-black hover:bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center"
                                >
                                    <Pause className="h-6 w-6 text-white" />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Values Section with Enhanced Animation */}
            <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            Why Choose Miah?
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            Our core values drive everything we do, ensuring you get the best fashion experience.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <Card
                                key={index}
                                className="border border-gray-200 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 group bg-white/80 backdrop-blur-sm"
                            >
                                <CardHeader className="text-center pb-4">
                                    <div className="mx-auto mb-4 p-4 bg-gray-50 rounded-full w-fit group-hover:bg-gray-100 transition-colors duration-300 transform group-hover:scale-110">
                                        {value.icon}
                                    </div>
                                    <CardTitle className="text-xl text-gray-900 group-hover:text-black transition-colors duration-300">
                                        {value.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-center text-gray-600 leading-relaxed">
                                        {value.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            Our Fashion Collections
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                            Explore some of our favorite pieces that have empowered style-conscious individuals worldwide.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="group cursor-pointer">
                            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                                <img
                                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=400&fit=crop"
                                    alt="Contemporary Dresses"
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <h3 className="font-semibold">Contemporary Dresses</h3>
                                    <p className="text-sm">Elegant & Modern</p>
                                </div>
                            </div>
                        </div>

                        <div className="group cursor-pointer">
                            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                                <img
                                    src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop"
                                    alt="Casual Chic"
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <h3 className="font-semibold">Casual Chic</h3>
                                    <p className="text-sm">Comfort Meets Style</p>
                                </div>
                            </div>
                        </div>

                        <div className="group cursor-pointer">
                            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                                <img
                                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop"
                                    alt="Professional Wear"
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <h3 className="font-semibold">Professional Wear</h3>
                                    <p className="text-sm">Business Ready</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-r from-gray-800 to-black text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6">
                        Ready to Elevate Your Style?
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                        Discover our complete collection of contemporary fashion and start expressing
                        your unique style with confidence today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button size="lg" className="bg-white text-black hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
                            Shop Our Collection
                        </Button>
                    </div>
                </div>
            </section>

            <style jsx>{`
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fade-in-up {
                    animation: fade-in-up 1s ease-out;
                }
            `}</style>
        </div>
        </MobileLayout>
    );
};

export default MiahClothingAbout;