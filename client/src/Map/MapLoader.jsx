import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { child, getDatabase, onValue, ref, set, update } from "firebase/database";
import React, { useEffect, useState } from 'react';
import MapDisplay from "./MapDisplay";

const firebaseConfig = {
    apiKey: "AIzaSyC3L6kA3WZMz_kWDzHkik6XdxDg2wL76rQ",
    authDomain: "interactive-seating-map.firebaseapp.com",
    databaseURL: "https://interactive-seating-map-default-rtdb.firebaseio.com",
    projectId: "interactive-seating-map",
    storageBucket: "interactive-seating-map.appspot.com",
    messagingSenderId: "81418916892",
    appId: "1:81418916892:web:cbe6007cf60fea1ed9bbd9",
    measurementId: "G-V58QSXK16K"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();

const MapLoader = () => {

    const [seats, setSeats] = useState([]);
    const [seatStyle, setSeatStyle] = useState();
    const [chosen, setChosen] = useState();

    const updateStyle = (index) => {
        setSeatStyle(prev => (prev === index ? null : index));
    }

    useEffect(() => {
        const mapRef = ref(database);
        onValue(mapRef, (snapshot) => {
            const seats = [];
            snapshot.forEach(childSnapshot => {
                seats.push(childSnapshot.val())
                setSeats(() => [
                    ...seats
                ])
            })
        })
    }, [])

    const handleSubmit = (index) => {
        // works but replaces whole object
        update(ref(database, '/' + index), {
            chosen: true
        }).then(() => console.log('success!'))
        .catch((error) => console.log(error))
        // works but replaces whole object

        // const seatRef = ref(database, '/' + index);
        // console.log(seatRef);

        // onValue(ref(database, '/' + index), (snapshot) => {
        //     let chosenSeat = snapshot.val()
        //     chosenSeat.chosen = true
        //     let finalChosen = chosenSeat
        //     setChosen(finalChosen)
        // })

        // console.log(chosen)

        // const seatRef = ref(database, '/' + index);
        // const seatRef = onValue(ref(database, '/' + index), (snapshot) => {
        //     setChosen(snapshot.val().chosen);
            // console.log('chosen', chosen);
        // }, {
        //     onlyOnce: true
        // });
        // seatRef.set(chosen);
        // console.log('seatref', seatRef);
        // seatRef.once('value', snapshot => {
        //     let chosenSeat = snapshot.val()
        //     chosenSeat.chosen = true
        //     seatRef.set(chosenSeat)
        // })

    }

    return (
        <div>
            <svg style={{ height: "90vh" }} id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 797.1896 862.6702">
                {seats && seats.map((seat, index) =>
                    <MapDisplay
                        index={index}
                        // seatStyle={seatStyle}
                        updateStyle={updateStyle}
                        x={seat.attributes.x}
                        y={seat.attributes.y}
                        seat={seat.seat}
                        chosen={seat.chosen}
                        height={seat.attributes.height}
                        width={seat.attributes.width}
                    />
                )}
            </svg>
            <button onClick = {() => handleSubmit(seatStyle)}>Submit</button>
        </div>
    )
}

export default MapLoader