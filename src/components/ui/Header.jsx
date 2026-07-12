import { useAppContext } from '../../context/AppContext';

export default function Header() {
    const { step, setStep, savedPlaces } = useAppContext();

    return (
        <header>
            <h1>
                Header
            </h1>
        </header>
    );
}