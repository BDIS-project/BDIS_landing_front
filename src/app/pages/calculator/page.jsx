'use client';
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import staffData from 'app/db/staff.json';
import titleData from 'app/db/titles.json';
import Card from 'components/card/Card';
import TagForm from 'components/autocomplete/TagForm';

import {
  Box,
  SimpleGrid,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  InputGroup,
  InputRightElement,
  useColorModeValue
} from "@chakra-ui/react";

import * as React from "react";
import { useState } from 'react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteTag,
} from "@choc-ui/chakra-autocomplete";
import { MaybeRenderProp } from '@chakra-ui/react-utils'

import { FiChevronRight, FiChevronDown } from "react-icons/fi";

// Custom components


export default function Calculator() {

  const staffNames = staffData.map(obj => obj.member);
  const titleNames = titleData.map(obj => obj.title);

  // Chakra Color Mode

  //const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'ditgray.500');
  const cardBg = useColorModeValue('secondaryGray.300', 'ditgray.600');

  const [selectedTitleTags, setSelectedTitleTags] = useState([]);
  const [selectedStaffTags, setSelectedStaffTags] = useState([]);

  const CustomEmptyState = () => {
    return <Box px='20px'><i>Результат поиска пуст.</i></Box>;
  };


  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        gap="20px"
        mb="20px"
      >
        <Card flexDirection='column' w='100%' px='20px'>
          <TagForm
            label="Сортировка по тайтлам:"
            data={titleNames}
            boxBg={boxBg}
            cardBg={cardBg}
          />
        </Card>
        <Card flexDirection='column' w='100%' px='20px'>
          <TagForm
            label="Сортировка по работягам:"
            data={staffNames}
            boxBg={boxBg}
            cardBg={cardBg}
          />
        </Card>
      </SimpleGrid>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        gap="20px"
        mb="20px"
      >
        <Card h="750px">
        </Card>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          gap="20px"
          mb="20px"
        >
          <Card h="300px">
          </Card>
          <Card h="300px">
          </Card>

        </SimpleGrid>
      </SimpleGrid>
    </Box >
  );
}

