import axios from "axios";
import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import{ toast } from "react-toastify";


const FormContainer = styled.form`
  display: flex;
  align-item: flex-end;
  gap: 20px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 40px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
 padding: 10px;
 cursor: pointer;
 border-radius: 5px;
 border: none;
 background-color: #2c73d2;
 color: white;
 height: 42px;
`;

const Input = styled.input`
width: 250px;
padding: 0 40px;
border: 1px solid #bbb;
border-radius: 5px;
height: 40px;
`;

const Label = styled.label``;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

    const Form  = ({ getUsers, onEdit, setOnEdit }) => {
        const ref = useRef();

        useEffect(() => {
          if (onEdit) {
            const user = ref.current;

            user.nome.value = onEdit.nome;
            user.email.value = onEdit.email;
            user.fone.value = onEdit.fone;
            user.endereco.value = onEdit.endereco;
            user.numero.value = onEdit.numero;
            user.bairro.value = onEdit.bairro;
            user.complemento.value = onEdit.complemento;
            user.data_nascimento.value = onEdit.data_nascimento;
          }
        }, [onEdit]);

        const handleSubmit = async (e) => {
          e.preventDefault();

          const user = ref.current;

          if (
            !user.nome.value || 
            !user.email.value ||
            !user.fone.value ||
            !user.endereco.value ||
            !user.numero.value ||
            !user.bairro.value ||
            !user.complemento.value ||
            !user.data_nascimento.value 
          )   {
            return toast.warn("Preencha todos os campos!");
          }
          if (onEdit) {
            await axios
              .put("http://localhost:8800/" + onEdit.id,{
                nome:            user.nome.value,
                email:           user.email.value,
                fone:            user.fone.value,
                endereco:        user.endereco.value,
                numero:          user.numero.value,
                bairro:          user.bairro.value,
                complemento:     user.complemento.value,
                data_nascimento: user.data_nascimento.value,
              })
              .then(({ data}) => toast.success(data))
              .catch(({ data}) => toast.error(data))        
          } else {
            await axios
              .post("http://localhost:8800/", {
                nome:        user.nome.value,
                email:       user.email.value,
                fone:        user.fone.value,
                endereco:    user.endereco.value,
                numero:      user.numero.value,
                bairro:      user.bairro.value,
                complemento: user.complemento.value,
                data_nascimento: user.data_nascimento.value,
              })
              .then(({ data }) => toast.success(data))
              .catch(({ data }) => toast.error(data));
          }

          user.nome.value = "";
          user.email.value = "";
          user.endereco.value = "";
          user.numero.value = "";
          user.bairro.value = "";
          user.complemento.value = "";
          user.fone.value = "";
          user.data_nascimento.value = "";

          setOnEdit(null);
          getUsers();
        };

        return (
        <FormContainer ref = {ref} onSubmit={handleSubmit }>
            <InputArea>
            <Label>Nome</Label>
            <Input name="nome"/>
            </InputArea>
            <InputArea>
            <Label>Endereço</Label>
            <Input name="endereco"/>
            </InputArea>  <InputArea>
            <Label>Número</Label>
            <Input name="numero"/>
            </InputArea> <InputArea>
            <Label>Bairro</Label>
            <Input name="bairro"/>
            </InputArea> <InputArea>
            <Label>Complemento</Label>
            <Input name="complemento"/>
            </InputArea>
            <InputArea>
            <Label>E-mail</Label>
            <Input name="email" type= "email" />
            </InputArea>
            <InputArea>
            <Label>Telefone</Label>
            <Input name="fone"/>
            </InputArea>
            <InputArea>
            <Label>Data de Nascimento</Label>
            <Input name="data_nascimento" type= "date"/>
            </InputArea>

            <Button type="submit">SALVAR</Button>

        </FormContainer>

        );
    };

    export default Form;