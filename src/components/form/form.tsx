import { 
    Avatar, 
    Button,
    MenuItem, 
    FormControl,
    IconButton,
    Divider,
} from '@mui/material';
import { ChangeEvent, useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Pet } from '../../dto/classes/Pet';
import { IFormData } from '../../dto/interfaces/IFormData';
import DogAvatar from '../../assets/images/avatar-dog.jpg';
import CatAvatar from '../../assets/images/avatar-cat.jpg';
import AddIcon from '@mui/icons-material/Add';
import CustomInput from '../customInput/customInput';
import CustomRadioGroup from '../customRadioGroup/customRadioGroup';
  
const dogBreeds = [
    { value: 'unknown', label: 'Неизвестно' },
    { value: 'metis', label: 'Метис' },
    { value: 'labrador', label: 'Лабрадор' },
    { value: 'german-shepherd', label: 'Немецкая овчарка' },
    { value: 'poodle', label: 'Пудель' },
];

const catBreeds = [
    { value: 'unknown', label: 'Неизвестно' },
    { value: 'metis', label: 'Метис' },
    { value: 'siamese', label: 'Сиамская' },
    { value: 'persian', label: 'Персидская' },
    { value: 'british', label: 'Британская' },
];

const Form = () => {
    const [formData, setFormData] = useState<IFormData>({
        petType:  0,
        breed: '',
        petName: '',
        petColor: '',
        description: '',
        birthDate: new Date(),
        petPhotos: [],
        petGender: 0,
        email: '',
        tel: '',
        personName: '',
        noticeType: 0,
        address: '',
        location: {
            lat: null,
            lng: null
        }
    })
  
    const [isLoading, setIsLoading] = useState(false);
    const [currentBreeds, setCurrentBreeds] = useState(dogBreeds);
    const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const petId = uuidv4();
    
    const fieldIds = {
      petType: `pet-type-${petId}`,
      noticeType: `notice-type-${petId}`,
      petGender: `pet-gender-${petId}`,
      petName: `pet-name-${petId}`,
      breed: `pet-breed-${petId}`,
      petColor: `pet-color-${petId}`,
      birthDate: `pet-birthdate-${petId}`,
      description: `pet-description-${petId}`,
      personName: `person-name-${petId}`,
      email: `person-email-${petId}`,
      tel: `person-tel-${petId}`
    };
  
    useEffect(() => {
      setCurrentBreeds(formData.petType === 0 ? dogBreeds : catBreeds);
      if (formData.breed && !currentBreeds.some(b => b.value === formData.breed)) {
        setFormData(prev => ({...prev, breed: ''}));
      }
    }, [formData.petType]);
  
    const handleInputChange = (field: keyof typeof formData) => (value: string | Date) => {
      setFormData(prev => ({...prev, [field]: value}));
    };
  
    const handleRadioChange = (e: ChangeEvent<HTMLInputElement>, field: keyof typeof formData) => {
      setFormData(prev => ({...prev, [field]: Number(e.target.value)}));
    };
  
    const handleAddPhoto = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        if (!file.type.match('image.*')) {
          alert('Пожалуйста, выберите файл изображения');
          return;
        }
  
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setAvatarSrc(event.target.result as string);
            setFormData(prev => ({
              ...prev,
              petPhotos: [{
                id: uuidv4(),
                url: event.target?.result as string,
                isMain: true
              }]
            }));
          }
        };
        reader.readAsDataURL(file);
      }
    };
  
    const validateForm = () => {
      const requiredFields = ['petName', 'personName', 'tel', 'petPhotos'];
      const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
      
      if (missingFields.length > 0) {
        alert(`Пожалуйста, заполните обязательные поля: ${missingFields.join(', ')}`);
        return false;
      }
      
      if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
        alert('Пожалуйста, введите корректный email');
        return false;
      }
      
      if (formData.tel && !/^[\d\s()+-\s]{7,20}$/.test(formData.tel)) {
        alert('Пожалуйста, введите корректный телефон (7-20 цифр)');
        return false;
      }

      if (formData.petPhotos.length < 1) {
        alert('Пожалуйста, добавьте фото');
        return false;
      }
      
      return true;
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateForm()) return;
      
      setIsLoading(true);
      
      try {
        // в petInfo собираются данные согласно IPet основного кода
        // нужно будет создать объект с данными пользователя, типом объявления (нашли / потеряли),
        // адресом и дополнительной информацией
        const petInfo = new Pet();
        petInfo.id = petId;
        petInfo.petName = formData.petName;
        petInfo.birthDate = formData.birthDate;
        petInfo.animalType = formData.petType;
        petInfo.photos = formData.petPhotos;
        
        console.log('Отправка данных:', petInfo);
        alert('Данные успешно отправлены!');
      } catch (error) {
        console.error('Ошибка при отправке:', error);
        alert('Произошла ошибка при отправке формы');
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleReset = () => {
      setFormData({
        petType: 0,
        breed: '',
        petName: '',
        petColor: '',
        description: '',
        birthDate: new Date(),
        petPhotos: [],
        petGender: 0,
        email: '',
        tel: '',
        personName: '',
        noticeType: 0,
        address: '',
        location: {
            lat: null,
            lng: null
        }
      });
      setAvatarSrc(null);
    };
  
    return (
      <FormControl 
        component="form" 
        onSubmit={handleSubmit}
        className='p-4 flex flex-col flex-1 gap-3'
        aria-label="Форма поиска питомца"
      >
        <h1 className='text-[#2F00B6] text-2xl font-semibold text-center'>Форма для поиска питомца</h1>
        
        <div className='flex flex-row gap-4 mb-2'>
          <div className='relative'>
            <Avatar 
              className='w-[180px] h-[180px] mx-[auto] rounded-[20px]' 
              src={avatarSrc || (formData.petType === 0 ? DogAvatar : CatAvatar)}
              alt={formData.petType === 0 ? 'Аватар собаки' : 'Аватар кошки'}
              aria-labelledby="pet-avatar"
            />
            <IconButton 
              className='p-[8px] absolute bottom-[10px] right-[calc(50%-18px)] bg-[#F5ECFF]' 
              onClick={handleAddPhoto}
              aria-label="Добавить фото питомца"
            >
              <AddIcon className='w-[20px] h-[20px]' />
            </IconButton>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </div>
          
          <div className='flex flex-col flex-1 justify-center gap-1'>
            <CustomRadioGroup
                value={formData.noticeType}
                id={fieldIds.noticeType}
                onChangeHandler={(e: ChangeEvent<HTMLInputElement>) => handleRadioChange(e, 'noticeType')}
                groupName='noticeType'
                radioLabels={{label1: 'Нашли', label2: 'Потеряли'}}
                radioNames={{name1: 'found', name2: 'lost'}}
            />
  
            <Divider className='mb-2' />

            <CustomRadioGroup
                value={formData.petType}
                id={fieldIds.petType}
                onChangeHandler={(e: ChangeEvent<HTMLInputElement>) => handleRadioChange(e, 'petType')}
                groupName='petType'
                radioLabels={{label1: 'Собака', label2: 'Кошка'}}
                radioNames={{name1: 'dog', name2: 'cat'}}
            />

            <Divider className='mb-2' />

            <CustomRadioGroup
                value={formData.petGender}
                id={fieldIds.petGender}
                onChangeHandler={(e: ChangeEvent<HTMLInputElement>) => handleRadioChange(e, 'petGender')}
                groupName='petGender'
                radioLabels={{label1: 'Мальчик', label2: 'Девочка'}}
                radioNames={{name1: 'male', name2: 'female'}}
            />
            
          </div>
        </div>
        
        <div className='flex-1 flex flex-row gap-2'>
            <CustomInput 
                id={fieldIds.petName}
                name="petName"
                value={formData.noticeType !== 0 ? formData.petName : 'Меня нашли!'}
                handleChange={(e) => handleInputChange('petName')(e.target.value)}
                label='Кличка'
            />
            
            <CustomInput 
                id={fieldIds.breed}
                name="breed"
                value={formData.breed}
                handleChange={(e) => handleInputChange('breed')(e.target.value)}
                label='Порода'
                select
                data-testid="breed-select-input"
            >
              <MenuItem>Не выбрано</MenuItem>
              {currentBreeds.map((breed) => (
                <MenuItem key={breed.value} value={breed.value}>
                  {breed.label}
                </MenuItem>
              ))}
            </CustomInput>
        </div>

        <div className='flex-1 flex flex-row gap-2'>
          <CustomInput 
            id={fieldIds.petColor}
            name="petColor"
            value={formData.petColor}
            handleChange={(e) => handleInputChange('petColor')(e.target.value)}
            label='Окрас'
          />
          
          <CustomInput 
            id={fieldIds.birthDate}
            name="birthDate"
            value={formData.birthDate instanceof Date && !isNaN(formData.birthDate.getTime()) 
                ? formData.birthDate.toISOString().split('T')[0] 
                : ''}
            handleChange={(e) => {
                const newDate = new Date(e.target.value);
                if (!isNaN(newDate.getTime())) handleInputChange('birthDate')(newDate);
            }}
            label='Дата рождения'
            type='date'
            tooltipText="Можно приблизительно"
            required
            />
        </div>

        <CustomInput 
            id="pet-address"
            name="address"
            value={formData.address}
            handleChange={(e) => handleInputChange('address')(e.target.value)}
            label={`Адрес, где питомец был ${formData.noticeType !== 0 ? 'потерян': 'найден'}`}
            required
        />

        <CustomInput 
            id={fieldIds.description}
            name="description"
            value={formData.description}
            handleChange={(e) => handleInputChange('description')(e.target.value)}
            label='Дополнительно'
            multiline 
            minRows={2} 
            maxRows={4}
        />
        
        <CustomInput 
          id={fieldIds.personName}
          name="personName"
          value={formData.personName}
          handleChange={(e) => handleInputChange('personName')(e.target.value)}
          label='Ваше имя'
          required
        />
        
        <div className='flex-1 flex flex-row gap-2'>
          <CustomInput 
            id={fieldIds.email}
            name="email"
            value={formData.email}
            handleChange={(e) => handleInputChange('email')(e.target.value)}
            label='E-mail'
            type="email"
          />
          
          <CustomInput 
            id={fieldIds.tel}
            name="tel"
            value={formData.tel}
            handleChange={(e) => handleInputChange('tel')(e.target.value)}
            label='Телефон'
            type="tel"
            required
          />
        </div>
        
        <div className='flex-1 flex flex-row gap-2 mt-4'>
          <Button 
            type="button"
            className='flex-1 rounded-[20px] text-[#2F00B6] border-[#2F00B6]' 
            variant="outlined" 
            size='large'
            onClick={handleReset}
            disabled={isLoading}
            aria-label="Сбросить форму"
          >
            Сбросить
          </Button>
          
          <Button 
            type="submit"
            className='flex-1 rounded-[20px] bg-[#2F00B6]' 
            variant="contained" 
            size='large'
            disabled={isLoading}
            aria-label="Отправить форму"
          >
            {isLoading ? 'Отправка...' : 'Отправить'}
          </Button>
        </div>
      </FormControl>
    )
  }
  
  export default Form;