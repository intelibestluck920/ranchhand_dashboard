import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Container, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import BreadCrumb from '../components/BreadCrumb';
import classnames from "classnames";
import MainMenu from '../components/MainMenu';
// import logo1 from "../asset/img/logo/update/logo1.jpg";

import styled from 'styled-components';


const MemberShip = () => {

    const pricing1 = [
        {
            id: 1,
            type: "Starter",
            rate: 19,
            description: "The perfect way to get started and get used to our tools.",
            projects: 3,
            Customers: 299,
            FTP: 5,
            supportClass: "danger",
            supportClassSymbol: "close",
            storageClass: "danger",
            storageClassSymbol: "close",
            domainClass: "danger",
            domainClassSymbol: "close",
            ribbon: false,
            planButtonClassname: "danger",
            btntxt: "Your Current Plan",
            btnstatus: " disabled ",
            rateYear: "$171",
            delrateYear: "$228"
        },
        {
            id: 2,
            type: "Professional",
            rate: 29,
            description: "Excellent for scalling teams to build culture. Special plan for professional business.",
            projects: 8,
            Customers: 499,
            FTP: 7,
            supportClass: "success",
            supportClassSymbol: "checkbox",
            storageClass: "danger",
            storageClassSymbol: "close",
            domainClass: "danger",
            domainClassSymbol: "close",
            ribbon: false,
            planButtonClassname: "info",
            btntxt: "Change Plan",
            rateYear: "261",
            delrateYear: "348"
        },
        {
            id: 3,
            type: "Enterprise",
            rate: 39,
            description: "This plan is for those who have a team alredy and running a large business.",
            projects: 15,
            Customers: "Unlimited",
            FTP: 12,
            supportClass: "success",
            supportClassSymbol: "checkbox",
            storageClass: "success",
            storageClassSymbol: "checkbox",
            domainClass: "danger",
            domainClassSymbol: "close",
            ribbon: true,
            planButtonClassname: "info",
            btntxt: "Change Plan",
            rateYear: "351",
            delrateYear: "468"
        },
        {
            id: 4,
            type: "Unlimited",
            rate: 49,
            description: "For most businesses that want to optimize web queries.",
            projects: "Unlimited",
            Customers: "Unlimited",
            FTP: "Unlimited ",
            supportClass: "success",
            supportClassSymbol: "checkbox",
            storageClass: "success",
            storageClassSymbol: "checkbox",
            domainClass: "success",
            domainClassSymbol: "checkbox",
            ribbon: false,
            planButtonClassname: "info",
            btntxt: "Change Plan",
            rateYear: "441",
            delrateYear: "588"
        },
    ]

    const pricing2 = [
        {
            id: 1,
            type: "Basic Plan",
            purpose: "For Startup",
            planIcon: "ri-book-mark-line",
            rate: 19,
            projects: 3,
            Customers: 299,
            FTP: 5,
            supportClass: "danger",
            supportClassSymbol: "close",
            storageClass: "danger",
            storageClassSymbol: "close",
            domainClass: "danger",
            domainClassSymbol: "close",
            ribbon: false,
            planButtonClassname: "soft-success",
            icon: "ri-book-mark-line",
            btntxt: "Sign up free"
        },
        {
            id: 2,
            type: "Pro Business",
            purpose: "Professional plans",
            planIcon: "ri-medal-line",
            rate: 29,
            projects: 15,
            Customers: "unlimited",
            FTP: 12,
            supportClass: "success",
            supportClassSymbol: "checkbox",
            storageClass: "danger",
            storageClassSymbol: "close",
            domainClass: "danger",
            domainClassSymbol: "close",
            ribbon: true,
            planButtonClassname: "success",
            icon: "ri-medal-line",
            btntxt: "Get started"
        },
        {
            id: 3,
            type: "Platinum Plan",
            purpose: "Enterprise Businesses",
            planIcon: "ri-stack-line",
            rate: 39,
            projects: "unlimited",
            Customers: "unlimited",
            FTP: "unlimited",
            supportClass: "success",
            supportClassSymbol: "checkbox",
            storageClass: "success",
            storageClassSymbol: "checkbox",
            domainClass: "success",
            domainClassSymbol: "checkbox",
            ribbon: false,
            planButtonClassname: "soft-success",
            icon: "ri-stack-line",
            btntxt: "Get started"
        },
    ]

    const pricing3 = [
        {
            id: 1,
            type: "Starter",
            purpose: "Starter plans",
            rate: 22,
            users: 1,
            storage: "01",
            domain: "No",
            support: "No",
            ribbon: false
        },
        {
            id: 2,
            type: "Professional",
            purpose: "Professional plans",
            rate: 29,
            users: 3,
            storage: "10",
            domain: "Yes",
            support: "No",
            ribbon: true
        },
        {
            id: 3,
            type: "Enterprise",
            purpose: "Enterprise plans",
            rate: 39,
            users: 3,
            storage: "20",
            domain: "Yes",
            support: "Yes",
            ribbon: true
        },
        {
            id: 4,
            type: "Unlimited",
            purpose: "Unlimited plans",
            rate: 49,
            users: 5,
            storage: "40",
            domain: "Yes",
            support: "Yes",
            ribbon: false
        },
    ]
    //Tab 
    const [activeTab, setActiveTab] = useState('1');
    const toggleTab = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };

    document.title = "Pricing | Velzon - React Admin & Dashboard Template";

    return (
        <div className='container'>
            <MainMenu />
            {/* <h1 className="title2">MemberShip</h1> */}
            <div className="container1">
                <div className="title-container">
                    <h1 className="title3">MemberShip</h1>
                </div>
                {/* <div className="logo-container">
                    <img src={logo1} alt="Logo" className="logo1" />
                </div> */}
            </div>
            <div className="col-12">
                <React.Fragment>
                    <div className="page-content">
                        <Container fluid>
                            <Row className="justify-content-center mt-5">
                                <Col lg={5}>
                                    <div className="text-center mb-4 pb-2">
                                        <h4 className="fw-semibold fs-22">Choose the plan that's right for you</h4>
                                        <p className="text-muted mb-4 fs-15">Simple pricing. No hidden fees. Advanced features for you business.</p>
                                    </div>
                                </Col>
                            </Row>

                            <Row style={{ padding: '2%' }}>
                                {(pricing2 || []).map((price2, key) => (
                                    <Col lg={4} key={key} style={{ width: '100%' }}>
                                        <Card className="pricing-box ribbon-box right" >
                                            {/* {price2.ribbon === true ? <div className="ribbon-two ribbon-two-danger"><span>Popular</span></div> : ""} */}
                                            <CardBody className="p-4 m-2" >
                                                <div className="d-flex align-items-center">
                                                    <div className="flex-grow-1">
                                                        <h5 className="mb-1 fw-semibold">{price2.type}</h5>
                                                        <p className="text-muted mb-0">{price2.purpose}</p>
                                                    </div>
                                                    <div className="avatar-sm">
                                                        <div className="avatar-title bg-light rounded-circle text-primary">
                                                            <i className={"fs-20 " + price2.icon}></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="pt-4" style={{ paddingTop: '20px' }}>
                                                    <h2><sup><small>$ </small></sup>{price2.rate}<span className="fs-13 text-muted" style={{ fontSize: "1rem" }}>/Month</span></h2>
                                                </div>
                                                <hr className="my-4 text-muted" />
                                                <div>
                                                    <ul className="list-unstyled text-muted vstack gap-3">
                                                        <li>
                                                            <div className="d-flex">
                                                                <div className="flex-shrink-0 text-success me-1">
                                                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                                </div>
                                                                <div className="flex-grow-1">
                                                                    Upto <b>{price2.projects}</b> Projects
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="d-flex">
                                                                <div className="flex-shrink-0 text-success me-1">
                                                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                                </div>
                                                                <div className="flex-grow-1">
                                                                    Upto <b>{price2.Customers}</b> Customers
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="d-flex">
                                                                <div className="flex-shrink-0 text-success me-1">
                                                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                                </div>
                                                                <div className="flex-grow-1">
                                                                    Scalable Bandwidth
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="d-flex">
                                                                <div className="flex-shrink-0 text-success me-1">
                                                                    <i className="ri-checkbox-circle-fill fs-15 align-middle"></i>
                                                                </div>
                                                                <div className="flex-grow-1">
                                                                    <b>{price2.FTP}</b> FTP Login
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="d-flex">
                                                                <div className={`flex-shrink-0 text-${price2.supportClass} me-1`}>
                                                                    <i className={`ri-${price2.supportClassSymbol}-circle-fill fs-15 align-middle`}></i>
                                                                </div>
                                                                <div className="flex-grow-1">
                                                                    <b>24/7</b> Support
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="d-flex">
                                                                <div className={`flex-shrink-0 text-${price2.storageClass} me-1`}>
                                                                    <i className={`ri-${price2.storageClassSymbol}-circle-fill fs-15 align-middle`}></i>
                                                                </div>
                                                                <div className="flex-grow-1">
                                                                    <b>Unlimited</b> Storage
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <div className="d-flex">
                                                                <div className={`flex-shrink-0 text-${price2.domainClass} me-1`}>
                                                                    <i className={`ri-${price2.domainClassSymbol}-circle-fill fs-15 align-middle`}></i>
                                                                </div>
                                                                <div className="flex-grow-1">
                                                                    Domain
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <div className="mt-4">
                                                        <Link to="#" className={`btn btn-${price2.planButtonClassname} w-100 waves-effect waves-light`}>{price2.btntxt}</Link>
                                                    </div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    </div>
                </React.Fragment>
            </div>
        </div>
    )
}

export default MemberShip