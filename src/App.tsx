import React, { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

import { hadis } from './shared/data';
import './App.css';
import { Stack, Typography } from '@mui/material';

function renderRow(props: ListChildComponentProps) {
  const { index, style, data } = props;

  return (
    <>
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton>
          <ListItemText primary={data[index].text} />
        </ListItemButton>
      </ListItem>
    </>
  );
}

interface IFormInput {
  search: string;
}

interface IHadis {
  text: string;
  keywords: string[];
}

function App() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      search: '',
    },
  });
  const [hadises, setHadises] = useState<IHadis[]>([]);

  useEffect(() => {
    setHadises(hadis);

    return () => setHadises([]);
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const { search } = data;
    const temp = hadis.filter((item) => item.keywords.includes(search) && item);

    if (temp.length === 0) {
      setHadises([
        {
          text: 'Ключевое слово не найдено',
          keywords: [],
        },
      ]);
    } else {
      setHadises(temp);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: 'mintcream',
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          pt: '20px',
          pb: '20px',
        }}
      >
        <Stack direction={'column'} spacing={'20px'}>
          <Typography
            variant="h1"
            component="h1"
            fontSize={'40px'}
            textAlign={'center'}
          >
            Лексическая классификация текстов хадисов
          </Typography>
          <Paper
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            sx={{
              p: '0',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Controller
              name="search"
              control={control}
              render={({ field }) => (
                <InputBase
                  {...field}
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Поиск"
                />
              )}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <Box
            sx={{
              width: '100%',
              // height: '100vh',
              maxWidth: '100%',
              bgcolor: 'darkseagreen',
              borderRadius: '4px',
            }}
          >
            <FixedSizeList
              height={1000}
              width={'100%'}
              itemSize={100}
              itemCount={hadises.length}
              overscanCount={5}
              itemData={hadises}
            >
              {renderRow}
            </FixedSizeList>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default App;
