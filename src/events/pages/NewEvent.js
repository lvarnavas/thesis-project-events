import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_MAXLENGTH} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

import './EventForm.css';

const NewEvent = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError} = useHttpClient();
    const [formState, inputHandler] = useForm(
        {
            title: {
                value: '',
                isValid: false
            },
            city: {
                value: '',
                isValid: false
            },
            prefecture: {
                value: '',
                isValid: false
            },
            address: {
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
            },
            endDate: {
                value: '',
                isValid: false
            },
            startTime: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            },
            images: {
                value: null,
                isValid: false
            },
        },
        false
    );

    const history = useHistory();

    const addImages = (images) => {
        if(!images || images.length < 1){
            return null;
        }

        const imagesArr = [];
        for (const img of images) {
            imagesArr.push(img.image);
        }
        return JSON.stringify(imagesArr);
    }

    const eventSubmitHandler = async event => {
        event.preventDefault();
        try {
            await sendRequest(process.env.REACT_APP_BACKEND_URL + '/events', 
            'POST',
            JSON.stringify({
                title: formState.inputs.title.value,
                city: formState.inputs.city.value,
                prefecture: formState.inputs.prefecture.value,
                address: formState.inputs.address.value,
                category: formState.inputs.category.value,
                startDate: formState.inputs.startDate.value,
                endDate: formState.inputs.endDate.value,
                startTime: formState.inputs.startTime.value,
                description: formState.inputs.description.value,
                userId: auth.userId,
                images: addImages(formState.inputs.images.value)
            }),
            {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            }
            );
            history.push('/');
        } catch (err) {}
    };
        
    return (
        <React.Fragment>
            <h1 className="center" style={{color: 'white'}}> 
                Insert the information to each field to create a new Event 
            </h1>
            <ErrorModal error={error} onClear={clearError} />
            <form className="place-form" onSubmit={eventSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay/>}
                <Input
                    id="title"
                    element="input"
                    type="text"
                    label="Title"
                    validators={[VALIDATOR_MINLENGTH(3), VALIDATOR_MAXLENGTH(50)]}
                    errorText="Please enter a valid title (at least 3 characters)."
                    onInput={inputHandler}
                />
                <Input
                    id="address"
                    element="input"
                    placeholder="π.χ. Παλαιολόγου 10, 50100"
                    label="Address"
                    validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(50)]}
                    errorText="Please enter a valid address."
                    onInput={inputHandler}
                />
                <Input
                    id="startDate"
                    element="input"
                    type="date"
                    label="Start Date"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid start date."
                    onInput={inputHandler}
                />
                <Input
                    id="endDate"
                    element="input"
                    type="date"
                    label="End Date"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid end date."
                    onInput={inputHandler}
                />
                <Input
                    id="startTime"
                    element="input"
                    type="time"
                    label="Start Time"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid time."
                    onInput={inputHandler}
                />
                <Input
                    id="city"
                    element="cities"
                    label="City"
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
                <Input
                    id="prefecture"
                    element="prefectures"
                    type="text"
                    label="Prefecture"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a valid prefecture."
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
                <Input
                    id="category"
                    element="categories"
                    label="Category"
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
                <Input
                    id="description"
                    element="textarea"
                    label="Description"
                    placeholder="π.χ. Η εκδήλωση..."
                    validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_MAXLENGTH(300)]}
                    errorText="Please enter a valid description (at least 5 characters)."
                    onInput={inputHandler}
                />
                <ImageUpload 
                    id="images" 
                    onInput={inputHandler} 
                    errorText="Please provide at least one image." 
                />
                <Button type="submit" disabled={!formState.isValid}> ADD EVENT</Button>
            </form>
        </React.Fragment>
    );
};

export default NewEvent;