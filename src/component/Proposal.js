import React from 'react';
import "../App.css";
import { Link } from 'react-router-dom';

const Proposals = () => {

    return (
        <div className="proposal">
            <div className='proposal-filter'>
                <h3>Proposals</h3>
                <form>
                    <input type='filter' placeholder='search' />
                </form>
            </div>
            
            <div className="proposal-container">
            
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Topic</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Project</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='link'>
                                <Link to="../vote">1.</Link>
                            </td>
                            <td>Create Move Token</td>
                            <td>06/07</td>
                            <td>10/07</td>
                            <td>Movement</td>
                            <td>Pending</td>
                        </tr>
                        <tr>
                            <td>2.</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default Proposals;