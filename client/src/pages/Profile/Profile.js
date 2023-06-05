import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';
import AccountDetails from './AccountDetails';

import './Profile.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faRightFromBracket, faHeart, faGaugeHigh, faUser } from '@fortawesome/free-solid-svg-icons';

function Profile() {
    const navigate = useNavigate();
    const { data } = useQuery(QUERY_USER);
    let user;

    if (data) {
        user = data.user;
    }

    function Dashboard() {
        return (
            <>
                <div>
                    <h2>Dashboard</h2>
                </div>
                <div>
                    {user ? (
                        <div className="panel-content">
                            <h3>Hello, <span>{user.firstName}!</span></h3>
                            <p>From your account dashboard you can view your recent orders, view your favorite designs, and edit your password and account details.</p>
                        </div>
                    ) : "loading..."}
                </div>
            </>
        )
    }

    function Orders() {
        return (
            <>
                <div>
                    <h2>Orders</h2>
                </div>
                <div>
                    {user ? (
                        <>
                            {user.orders.map((order) => (
                                <div key={order._id}>
                                    <h3>
                                        {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                                    </h3>
                                    <div>
                                        {order.products.map(({ _id, name, price, quantity }, index) => (
                                            <div key={index}>
                                                <div>
                                                    <span>{quantity}</span>
                                                    <Link to={`/products/${_id}`}>{name}</Link>
                                                    <span>${price}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : "loading..."}
                </div>
            </>
        )
    }

    function Favorites() {
        return (
            <>
                <div>
                    <h2>Favourites</h2>
                </div>
                <div>
                    {user ? (
                        <>
                            {user.savedProducts.length > 0 ? (
                                <>
                                    {user.savedProducts.map(({ _id, name, price, image }, index) => (
                                        <div key={index}>
                                            <h3>
                                                <Link to={`/products/${_id}`}>{name}</Link>
                                                {image}
                                                ${price}
                                            </h3>
                                        </div>
                                    ))}
                                </>
                            ) : <h3>You haven't saved any products yet</h3>}
                        </>
                    ) : "loading..."}
                </div>
            </>
        )
    }

    return (
        <>
            <div className="profile-page">
                <Tabs>
                    <aside>
                        <TabList>
                            <Tab>
                                <p><span><FontAwesomeIcon icon={faGaugeHigh} color="#343131" /></span>Dashboard</p>
                            </Tab>
                            <Tab>
                                <p><span><FontAwesomeIcon icon={faCartShopping} color="#343131" /></span>Orders</p>
                            </Tab>
                            <Tab>
                                <p><span><FontAwesomeIcon icon={faHeart} color="#343131" /></span>Favorites</p>
                            </Tab>
                            <Tab>
                                <p><span><FontAwesomeIcon icon={faUser} color="#343131" /></span>Account details</p>
                            </Tab>
                            <Tab>
                                <p onClick={() => navigate('/logout')}><span><FontAwesomeIcon icon={faRightFromBracket} color="#343131" /></span>Logout</p>
                            </Tab>
                        </TabList>
                    </aside>
                    <section>
                        <TabPanel>
                            {Dashboard()}
                        </TabPanel>
                        <TabPanel>
                            {Orders()}
                        </TabPanel>
                        <TabPanel>
                            {Favorites()}
                        </TabPanel>
                        <TabPanel>
                            <AccountDetails />
                        </TabPanel>
                        <TabPanel>
                            {/* <>This section is blank on purpose to avoid an error message because there are X tabs and there must be X tab panels. Log out redirects to logout page</> */}
                        </TabPanel>
                    </section>
                </Tabs>
            </div>
        </>
    )
}

export default Profile;