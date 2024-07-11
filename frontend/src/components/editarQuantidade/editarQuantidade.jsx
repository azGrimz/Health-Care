import { useState } from "react";
import { Button } from "../ui/button";
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Swal from "sweetalert2";
import blogFetch from "@/axios/config";

export function EditarQuantidade({idDisponibilidade, idQuantidadeAlterar}) {
    const [quantidade, setQuantidade] = useState();

    
    const editarEspecialidade = async (e) => {
        e.preventDefault();
        try {
            await blogFetch.put(`/informarEspecialidade/${idDisponibilidade}`, {
                quantidade: quantidade
            });
            Swal.fire({
                icon: 'success',
                text: 'Quantidade alterada!'
              });
              idQuantidadeAlterar({idDisponibilidade, quantidade})
        } catch (e) {
            Swal.fire({
                icon: 'error',
                text: 'Erro ao editar!'
            });
        }
    }

    return (
        <DialogContent>

            <DialogHeader>
                <DialogTitle>Quantidade de especialistas</DialogTitle>
                <DialogDescription>
                    Atualize a quantidade de especialista 
                </DialogDescription>
            </DialogHeader>

            <form onSubmit={editarEspecialidade}>
                <div className='space-y-2 py-3'>

                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='senhaAntiga' className='text-right'>Quantidade</Label>
                        <Input
                            defaultValue={quantidade}
                            onChange={(e) => setQuantidade(Number(e.target.value))}
                            type='number' id='senhaAntiga' className='col-span-2 border-2 border-solid border-[rgba(184,185,190,1)]'
                        />
                    </div>
                </div>

                <DialogFooter>
                    <DialogDescription>
                        <DialogClose asChild>
                            <Button className="border-2 border-solid border-[rgba(184,185,190,1)] bg-white color text-black hover:border hover:bg-transparent hover:border-solid hover:border-[black]">
                                Cancelar
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                        <Button
                            type="submit" className="bg-emerald-500 ml-2 hover:bg-[#06e84a]">
                                Salvar
                        </Button>
                        </DialogClose>
                    </DialogDescription>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}
