import React, { useState, useEffect } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

import { Slider } from '@/components/ui/slider';

import { Label } from '@/components/ui/label';

import { Input } from '@/components/ui/input';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


 

const ToolOptionsModal = ({ tool, isOpen, onClose, onProcess }) => {

    const [options, setOptions] = useState({});


 

    useEffect(() => {

        if (tool && tool.options) {

            const defaultOptions = tool.options.reduce((acc, option) => {

                acc[option.id] = option.defaultValue;

                return acc;

            }, {});

            setOptions(defaultOptions);

        }

    }, [tool]);


 

    if (!tool) return null;


 

    const handleValueChange = (id, value) => {

        setOptions(prev => ({ ...prev, [id]: value }));

    };

    

    const handleSliderChange = (id, value) => {

        handleValueChange(id, value[0]);

    }


 

    const handleProcess = () => {

        onProcess(options);

    };


 

    const renderOption = (option) => {

        switch (option.type) {

            case 'slider':

                return (

                    <div key={option.id} className="space-y-4">

                        <Label htmlFor={option.id} className="text-white">{option.label}</Label>

                        <div className="flex items-center space-x-4">

                            <Slider

                                id={option.id}

                                min={option.min}

                                max={option.max}

                                step={option.step}

                                value={[options[option.id] ?? option.defaultValue]}

                                onValueChange={(value) => handleSliderChange(option.id, value)}

                                className="w-full"

                            />

                            <span className="text-purple-300 w-16 text-center">{options[option.id] ?? option.defaultValue}{option.unit}</span>

                        </div>

                    </div>

                );

            case 'range':

                 return (

                    <div key={option.id} className="space-y-2">

                        <Label htmlFor={option.id} className="text-white">{option.label}</Label>

                        <div className="flex items-center space-x-2">

                            <Input type="number" value={options[option.id]?.[0] ?? option.defaultValue[0]} onChange={(e) => handleValueChange(option.id, [Number(e.target.value), options[option.id]?.[1]])} className="bg-gray-800 border-gray-700 text-white" />

                             <span className="text-gray-400">-</span>

                            <Input type="number" value={options[option.id]?.[1] ?? option.defaultValue[1]} onChange={(e) => handleValueChange(option.id, [options[option.id]?.[0], Number(e.target.value)])} className="bg-gray-800 border-gray-700 text-white" />

                        </div>

                    </div>

                );

            case 'select':

                return (

                    <div key={option.id} className="space-y-2">

                        <Label htmlFor={option.id} className="text-white">{option.label}</Label>

                        <Select onValueChange={(value) => handleValueChange(option.id, value)} defaultValue={option.defaultValue}>

                            <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">

                                <SelectValue placeholder={option.placeholder} />

                            </SelectTrigger>

                            <SelectContent>

                                {option.items.map(item => (

                                    <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>

                                ))}

                            </SelectContent>

                        </Select>

                    </div>

                );

            case 'equalizer':

                return (

                     <div key={option.id} className="space-y-4">

                        {option.bands.map(band => (

                            <div key={band.freq} className="space-y-2">

                                <Label className="text-white">{band.label}</Label>

                                <div className="flex items-center space-x-4">

                                     <Slider

                                        min={-20}

                                        max={20}

                                        step={1}

                                        value={[options[option.id]?.[band.freq] ?? 0]}

                                        onValueChange={(value) => {

                                            const newBands = {...(options[option.id] || {}), [band.freq]: value[0]};

                                            handleValueChange(option.id, newBands)

                                        }}

                                        className="w-full"

                                    />

                                    <span className="text-purple-300 w-16 text-center">{options[option.id]?.[band.freq] ?? 0} dB</span>

                                </div>

                            </div>

                        ))}

                    </div>

                );

            default:

                return null;

        }

    };

    

    return (

        <Dialog open={isOpen} onOpenChange={!isOpen ? onClose : () => {}}>

            <DialogContent className="sm:max-w-[425px] glass-effect border-purple-500 text-white">

                <DialogHeader>

                    <DialogTitle className="section-header text-2xl">{tool.name}</DialogTitle>

                    <DialogDescription>{tool.description}</DialogDescription>

                </DialogHeader>

                <div className="py-4 space-y-6">

                    {tool.options.map(renderOption)}

                </div>

                <DialogFooter>

                    <Button variant="outline" onClick={onClose}>Cancel</Button>

                    <Button onClick={handleProcess} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">Apply & Process</Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>

    );

};


 

export default ToolOptionsModal;
 