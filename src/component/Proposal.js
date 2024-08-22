// import React from 'react';
// import "../App.css";
// import { Link } from 'react-router-dom';

// const Proposals = () => {

//     return (
//         <div className="proposal">
//             <div className='proposal-filter'>
//                 <h3>Proposals</h3>
//                 <form>
//                     <input type='filter' placeholder='search' />
//                 </form>
//             </div>
            
//             <div className="proposal-container">
            
//                 <table className="styled-table">
//                     <thead>
//                         <tr>
//                             <th>id</th>
//                             <th>Topic</th>
//                             <th>Start</th>
//                             <th>End</th>
//                             <th>Project</th>
//                             <th>Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
//                             <td className='link'>
//                                 <Link to="../vote">1.</Link>
//                             </td>
//                             <td><Link to="../vote">Who Should be MoveDAO President</Link></td>
//                             <td>06/07</td>
//                             <td>10/07</td>
//                             <td>Movement</td>
//                             <td>Pending</td>
//                         </tr>
//                         <tr>
//                             <td className='link'>
//                                 <Link to="../vote">1.</Link>
//                             </td>
//                             <td><Link to="../vote2">Who Should be MoveDAO President</Link></td>
//                             <td>06/07</td>
//                             <td>10/07</td>
//                             <td>Movement</td>
//                             <td>Pending</td>
//                         </tr>
//                     </tbody>

//                 </table>

//             </div>

//         </div>
//     );
// };

// export default Proposals;
import React, { useState } from 'react';
import "../App.css";
import { Link } from 'react-router-dom';

const Proposals = () => {
    const [filter, setFilter] = useState('');

    const proposals = [
        {
            id: 1,
            topic: 'Who Should be MoveDAO President',
            start: '06/07',
            end: '10/07',
            project: 'Movement',
            status: 'Pending',
            link: '../vote'
        },
        {
            id: 2,
            topic: 'Proposal for New Tokenomics',
            start: '08/07',
            end: '12/07',
            project: 'Tokenomics',
            status: 'Approved',
            link: '/vote2'
        },
        {
            id: 3,
            topic: 'Proposal for New Movement, Youtube Show',
            start: '08/07',
            end: '12/07',
            project: 'Social',
            status: 'Approved',
            link: '/vote3'
        },
        // Add more proposals here
    ];

    const filteredProposals = proposals.filter(proposal =>
        proposal.topic.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="proposal">
            <div className='proposal-filter'>
                <h3>Proposals</h3>
                <form>
                    <input
                        type='text'
                        placeholder='Search'
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                    />
                </form>
            </div>
            
            <div className="proposal-container">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Topic</th>
                            <th></th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Project</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProposals.map(proposal => (
                            <tr key={proposal.id}>
                                <td className='link'>
                                    <Link to={proposal.link}>{proposal.id}.</Link>
                                </td>
                                <td><Link to={proposal.link}>{proposal.topic}</Link></td>
                                <button><Link to={proposal.link}><p>Vote Here</p></Link></button>
                                <td>{proposal.start}</td>
                                <td>{proposal.end}</td>
                                <td>{proposal.project}</td>
                                <td>{proposal.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Proposals;
