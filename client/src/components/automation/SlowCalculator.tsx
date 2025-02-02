import React, { useState } from 'react';

export const SlowCalculator: React.FC = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleButtonClick = (value: string) => {
        setInput((prev) => prev + value);
    };

    const handleClear = () => {
        setInput('');
        setResult(null);
    };

    const handleCalculate = () => {
        setLoading(true);
        setTimeout(() => {
            try {
                // eslint-disable-next-line no-eval
                const res = eval(input);
                setResult(res.toString());
            } catch (error) {
                setResult('Error');
            }
            setLoading(false);
        }, 5000);
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 dark:text-dark-heading">Slow Calculator</h2>
            <div className="border rounded p-4 mb-4">
                <div className="text-right text-2xl mb-4">{input || '0'}</div>
                <div className="text-right text-2xl mb-4">
                    {loading ? 'Calculating...' : result}
                </div>
                <div className="grid grid-cols-4 gap-2">
                    {['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '*', '0', '.', '=', '/'].map((value) => (
                        <button
                            key={value}
                            onClick={() => (value === '=' ? handleCalculate() : handleButtonClick(value))}
                            className="bg-blue-500 text-white p-4 rounded hover:bg-blue-600"
                            disabled={loading}
                        >
                            {value}
                        </button>
                    ))}
                    <button
                        onClick={handleClear}
                        className="col-span-4 bg-red-500 text-white p-4 rounded hover:bg-red-600"
                        disabled={loading}
                    >
                        Clear
                    </button>
                </div>
            </div>
        </div>
    );
};