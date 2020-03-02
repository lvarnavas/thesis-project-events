import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { VALIDATOR_REQUIRE} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';

import './EventForm.css';

const FilterCity = () => {
    const { isLoading, error, sendRequest, clearError} = useHttpClient();
    
    const [formState, inputHandler] = useForm(
        {
            city: {
                value: '',
                isValid: false
            },
            prefecture: {
                value: '',
                isValid: false
            },
            category: {
                value: '',
                isValid: false
            },
            startDate: {
                value: '',
                isValid: false
            }
        },
        false
    );
    
    const history = useHistory();

    const eventCitySubmitHandler = async event => {
        event.preventDefault();
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL + '/events/city', 
                'POST', 
                JSON.stringify({
                city: formState.inputs.city.value,
            }),
            { 'Content-Type': 'application/json' }
            );
            const cityTable = responseData.events.find(city => city.id); 
            const cityId = cityTable.city.id;
            history.push('/city/' + cityId  ); 
        } catch (err) {}
    };

    const eventPrefectureSubmitHandler = async event => {
        event.preventDefault();
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL + '/events/prefecture', 
                'POST', 
                JSON.stringify({
                prefecture: formState.inputs.prefecture.value,
            }),
            { 'Content-Type': 'application/json' }
            );
            const prefectureTable = responseData.events.find(prefecture => prefecture.id); 
            const prefectureId = prefectureTable.prefecture.id;
            history.push('/prefecture/' + prefectureId  ); 
        } catch (err) {}
    };

    const eventCategorySubmitHandler = async event => {
        event.preventDefault();
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL + '/events/category', 
                'POST', 
                JSON.stringify({
                category: formState.inputs.category.value,
            }),
            { 'Content-Type': 'application/json' }
            );
            const categoryTable = responseData.events.find(category => category.id); 
            const categoryId = categoryTable.category.id;
            history.push('/category/' + categoryId  ); 
        } catch (err) {}
     }; 

    const eventStartDateSubmitHandler = async event => {
        event.preventDefault();
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND_URL + '/events/startdate', 
                'POST', 
                JSON.stringify({
                startDate: formState.inputs.startDate.value,
            }),
            { 'Content-Type': 'application/json' }
            );
            const date = responseData.events.find(startingdate => startingdate.startDate);
            const stdate = date.startDate;
            history.push('/startdate/' + stdate ); 
            } catch (err) {}
     }; 

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <form className="place-form" onSubmit={eventCitySubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay/>}
                <h2 className="center"> Search for Events choosing a city from the list. </h2>
                <div className="center">
                    <Input
                        id="city"
                        element="cities"
                        label="Pick city"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid city."
                        onInput={inputHandler}
                        option=" "
                        option1="ΑΘΗΝΑ"
                        option2="ΘΕΣΣΑΛΟΝΙΚΗ"
                        option3="ΠΑΤΡΑ"
                        option4="ΗΡΑΚΛΕΙΟ"
                        option5="ΛΑΡΙΣΑ"
                        option6="ΒΟΛΟΣ"
                        option7="ΙΩΑΝΝΙΝΑ"
                        option8="ΤΡΙΚΑΛΑ"
                        option9="ΧΑΛΚΙΔΑ"
                        option10="ΣΕΡΡΕΣ"
                        option11="ΑΛΕΞΑΝΔΡΟΥΠΟΛΗ"
                        option12="ΞΑΝΘΗ"
                        option13="ΚΑΤΕΡΙΝΗ"
                        option14="ΑΓΡΙΝΙΟ"
                        option15="ΚΑΛΑΜΑΤΑ"
                        option16="ΚΑΒΑΛΑ"
                        option17="ΧΑΝΙΑ"
                        option18="ΛΑΜΙΑ"
                        option19="ΚΟΜΟΤΗΝΗ"
                        option20="ΡΟΔΟΣ"
                        option21="ΔΡΑΜΑ"
                        option22="ΒΕΡΟΙΑ"
                        option23="ΚΟΖΑΝΗ"
                        option24="ΚΑΡΔΙΤΣΑ"
                        option25="ΡΕΘΥΜΝΟ"
                        option26="ΠΤΟΛΕΜΑΪΔΑ"
                        option27="ΤΡΙΠΟΛΗ"
                        option28="ΚΟΡΙΝΘΟΣ"
                        option29="ΓΕΡΑΚΑΣ"
                        option30="ΓΙΑΝΝΙΤΣΑ"
                        option31="ΜΥΤΙΛΗΝΗ"
                        option32="ΧΙΟΣ"
                        option33="ΣΑΛΑΜΙΝΑ"
                        option34="ΕΛΕΥΣΙΝΑ"
                        option35="ΚΕΡΚΥΡΑ"
                        option36="ΠΥΡΓΟΣ"
                        option37="ΜΕΓΑΡΑ"
                        option38="ΚΙΛΚΙΣ"
                        option39="ΘΗΒΑ"
                        option40="ΑΡΓΟΣ"
                        option41="ΑΡΤΑ"
                        option42="ΛΙΒΑΔΕΙΑ"
                        option43="ΩΡΑΙΟΚΑΣΤΡΟ"
                        option44="ΑΙΓΙΟ"
                        option45="ΚΩΣ"
                        option46="ΚΟΡΩΠΙ"
                        option47="ΠΡΕΒΕΖΑ"
                        option48="ΣΠΑΡΤΗ"
                        option49="ΝΑΟΥΣΑ"
                        option50="ΟΡΕΣΤΙΑΔΑ"
                        option51="ΠΕΡΑΙΑ"
                        option52="ΕΔΕΣΣΑ"
                        option53="ΦΛΩΡΙΝΑ"
                        option54="ΑΜΑΛΙΑΔΑ" 
                        option55="ΠΑΛΛΗΝΗ"
                        option56="ΘΕΡΜΗ"
                        option57="ΒΑΡΗ"
                        option58="ΝΕΑ ΜΑΚΡΗ"
                        option59="ΑΛΕΞΑΝΔΡΕΙΑ" 
                        option60="ΝΑΥΠΛΙΟ"
                        option61="ΝΑΥΠΑΚΤΟΣ"
                        option62="ΓΡΕΒΕΝΑ"
                        option63="ΜΕΣΟΛΟΓΓΙ"
                    />
                </div>
                <div className="center">
                    <Button type="submit" >SEARCH</Button>
                </div>
            </form>
            <br/>
            <form className="place-form" onSubmit={eventPrefectureSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay/>}
                <h2 className="center"> Search for Events choosing a prefecture from the list. </h2>
                <div className="center">
                    <Input
                        id="prefecture"
                        element="prefectures"
                        label="Pick prefecture"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid city."
                        onInput={inputHandler}
                        option=" "
                        option1="ΑΤΤΙΚΗΣ"
                        option2="ΘΕΣΣΑΛΟΝΙΚΗΣ"
                        option3="ΑΧΑΪΑΣ"
                        option4="ΗΡΑΚΛΕΙΟΥ"
                        option5="ΛΑΡΙΣΑΣ"
                        option6="ΑΙΤΩΛΟΑΚΑΡΝΑΝΙΑΣ"
                        option7="ΕΥΒΟΙΑΣ"
                        option8="ΜΑΓΝΗΣΙΑΣ"
                        option9="ΣΕΡΡΩΝ"
                        option10="ΗΛΕΙΑΣ"
                        option11="ΔΩΔΕΚΑΝΗΣΟΥ"
                        option12="ΦΘΙΩΤΙΔΑΣ"
                        option13="ΜΕΣΣΗΝΙΑΣ"
                        option14="ΙΩΑΝΝΙΝΩΝ"
                        option15="ΚΟΖΑΝΗΣ"
                        option16="ΚΟΡΙΝΘΙΑΣ"
                        option17="ΧΑΝΙΩΝ"
                        option18="ΕΒΡΟΥ"
                        option19="ΠΕΛΛΑΣ"
                        option20="ΚΑΒΑΛΑΣ"
                        option21="ΗΜΑΘΙΑΣ"
                        option22="ΤΡΙΚΑΛΩΝ"
                        option23="ΒΟΙΩΤΙΑΣ"
                        option24="ΠΙΕΡΙΑΣ"
                        option25="ΚΑΡΔΙΤΣΑΣ"
                        option26="ΚΥΚΛΑΔΩΝ"
                        option27="ΚΕΡΚΥΡΑΣ"
                        option28="ΡΟΔΟΠΗΣ"
                        option29="ΛΕΣΒΟΥ"
                        option30="ΑΡΓΟΛΙΔΑΣ"
                        option31="ΧΑΛΚΙΔΙΚΗΣ"
                        option32="ΔΡΑΜΑΣ"
                        option33="ΑΡΚΑΔΙΑΣ"
                        option34="ΞΑΝΘΗΣ"
                        option35="ΛΑΚΩΝΙΑΣ"
                        option36="ΚΙΛΚΙΣ"
                        option37="ΡΕΘΥΜΝΟΥ"
                        option38="ΑΡΤΑΣ"
                        option39="ΛΑΣΙΘΙΟΥ"
                        option40="ΠΡΕΒΕΖΑΣ"
                        option41="ΦΛΩΡΙΝΑΣ"
                        option42="ΚΑΣΤΟΡΙΑΣ"
                        option43="ΧΙΟΥ"
                        option44="ΦΩΚΙΔΑΣ"
                        option45="ΘΕΣΠΡΩΤΙΑΣ"
                        option46="ΣΑΜΟΥ"
                        option47="ΚΕΦΑΛΛΗΝΙΑΣ"
                        option48="ΖΑΚΥΝΘΟΥ"
                        option49="ΓΡΕΒΕΝΩΝ"
                        option50="ΕΥΡΥΤΑΝΙΑΣ"
                        option51="ΛΕΥΚΑΔΑΣ"
                    />
                </div>
                <div className="center">
                    <Button type="submit"> SEARCH </Button>
                </div>
            </form>
            <br/>
            <form className="place-form" onSubmit={eventCategorySubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay/>}
                <h2 className="center"> Search for Events choosing a category from the list.</h2>
                <div className="center">
                    <Input
                        id="category"
                        element="categories"
                        label="Pick category"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid category."
                        onInput={inputHandler}
                        option=" "
                        option1="ΚΙΝΗΜΑΤΟΓΡΑΦΟΣ"
                        option2="ΘΕΑΤΡΟ"
                        option3="ΧΩΡΟΣ"
                        option4="ΕΠΙΣΤΗΜΗ"
                        option5="ΚΟΙΝΩΝΙΚΗ"
                        option6="ΠΟΛΙΤΙΚΗ"
                        option7="ΠΟΛΙΤΙΣΤΙΚΗ"
                        option8="ΚΑΡΝΑΒΑΛΙ - ΑΠΟΚΡΙΕΣ"
                        option9="ΦΙΛΑΝΘΡΩΠΙΚΗ"
                        option10="ΕΠΙΧΕΙΡΗΣΗ"
                        option11="ΦΕΣΤΙΒΑΛ"
                        option12="ΜΟΥΣΙΚΗ"
                        option13="ΑΘΛΗΣΗ"
                        option14="ΤΕΧΝΗ"
                        option15="ΒΙΒΛΙΟ"
                        option16="ΠΑΙΔΙ"
                        option17="ΥΓΕΙΑ"
                    />
                </div>
                <div className="center">
                    <Button type="submit"> SEARCH </Button>
                </div>
            </form>
            <br/>
            <form className="place-form" onSubmit={eventStartDateSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay/>}
                <h2 className="center"> Search for Events choosing a date from the calendar.</h2>
                <div className="center">
                    <Input
                        id="startDate"
                        element="input"
                        type="date"
                        label="Pick starting date"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid start date."
                        onInput={inputHandler}
                    />
                </div>
                <div className="center">
                    <Button type="submit" >SEARCH</Button>
                </div>
            </form>
        </React.Fragment>
    );
};

export default FilterCity;